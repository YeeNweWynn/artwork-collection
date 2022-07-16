import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs'
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import { ArtworkService } from '../../services/artwork.service';
import { Artwork, DropdownOption, FilterArtworkOption } from '../../models/artwork';


@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {

  artworks?: Observable<Artwork[]>;
  filteredArtwork?: Observable<Artwork[]>;
  sortOption: DropdownOption[] = [
    {key: 'title', value: 'Name'}, 
    {key: 'artist_title', value: 'Artist'}, 
    {key: 'date_start', value: 'Date'}
  ]
  FilterArtworkOption: FilterArtworkOption[] = []
  filterForm = this.fb.group({
    filterArtwork: [''],
    sortArtwork: [''],
  })
 
  imageUrl: string = '';
  count: number = 210;
  page: number = 1;
  perPage: number = 8;

  constructor(
    private artWorkService: ArtworkService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getArtWorks();
    this.filterAndSortArtwork();   
  }

  get form() {
    return this.filterForm.controls;
  }

  selectLabel(option: FilterArtworkOption): string {
    return `${option.title} (${option.count})`;
  }

  selectValue(option: FilterArtworkOption): string {
    return option.title;
  }

  onChangeFilter() {
    console.log('change filter',  this.form['filterArtwork'].value)
  }

  onChangeSorting() {
    console.log('change sorting', this.form['sortArtwork'].value);
  }

  getArtWorks() {
    let params = new HttpParams();
    params = params.append('page', this.page);
    params = params.append('limit', this.perPage);
    this.artworks = this.artWorkService.getArtWorks(params).pipe(
      map(res => {
        this.FilterArtworkOption = this.filterArtworkOptionData(res.data);
        //console.log('filterOption', this.FilterArtworkOption)
        this.imageUrl = res.config.iiif_url;
        this.page = res.pagination.current_page;
        this.perPage = res.pagination.limit;
        this.count = res.pagination.total_pages;
        return res.data;
      }),
      catchError(err => {
        return of ([]);
      })
    )
  }

  filterArtworkOptionData(data: Artwork[]): FilterArtworkOption[] {
    const filterArr: FilterArtworkOption[] = []
    
    data.forEach((data: Artwork) => {
      if (data.style_titles) {
        data.style_titles.forEach((val: string) => {
          const index = filterArr.findIndex(x => x.title == val)
          if(index == -1){
            filterArr.push({
              count: 1, 
              title: val
            })
          }
          else{
            filterArr[index].count++;
          }
        }) 
      }
    })
    return filterArr;
  }

  filterAndSortArtwork() {
   
  }

  prevPage() {
    this.page--;
    this.form['filterArtwork'].reset();
    this.getArtWorks();
  }

  nextPage() {
    this.page++;
    this.form['filterArtwork'].reset();
    this.getArtWorks();
  }

  goToPage(n: number) {
    this.page = n;
    this.form['filterArtwork'].reset();
    this.getArtWorks();
  }

}
