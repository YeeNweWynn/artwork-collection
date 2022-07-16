import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs'
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { filter } from 'rxjs/operators';

import { ArtworkService } from '../../services/artwork.service';
import { Artwork, DropdownOption, FilterArtworkOption } from '../../models/artwork';


@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {
  artworks: Artwork[] = [];
  tempArtworks: Artwork[] = [];
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
 
  isLoading:boolean = false;
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
    this.onFilterChangesListner(); 
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

  onFilterChangesListner(): void {
    this.form['filterArtwork'].valueChanges.subscribe((filterArr) => {
      if (filterArr.length) {
        this.artworks = this.tempArtworks.filter((artwork) => {
          return filterArr.some((f: string) => {
            return artwork.style_titles.includes(f);
          });
        });
      }else {
        this.artworks = this.tempArtworks;
      }
    });
  }

  onChangeSorting(sortKey: string) {
    console.log('change sorting', sortKey);
  }

  getArtWorks() {
    const params = {
      page: this.page,
      limit: this.perPage,
    };
    this.isLoading = true;
    this.artWorkService.getArtWorks(params).subscribe((res: any) => {
      this.isLoading = false;
      this.FilterArtworkOption = this.filterArtworkOptionData(res.data);
      //console.log('filterOption', this.FilterArtworkOption)
      this.imageUrl = res.config.iiif_url;
      this.page = res.pagination.current_page;
      this.perPage = res.pagination.limit;
      this.count = res.pagination.total_pages;
      this.artworks = res.data;
      this.tempArtworks = res.data;
    });
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
