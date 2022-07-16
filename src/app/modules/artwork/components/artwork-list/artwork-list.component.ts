import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs'
import { HttpParams } from '@angular/common/http';
import { FormBuilder } from "@angular/forms";

import { ArtworkService } from '../../services/artwork.service';
import { Artwork, DropdownOption, FilterArtworkOption } from '../../models/artwork';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {

  artworks?: Observable<Artwork[]>;
  filteredArtwork!: Observable<Artwork[]>;
  sortOption: DropdownOption[] = [
    {key: '', value: 'Recommendation'}, 
    {key: 'title', value: 'Name'}, 
    {key: 'artist_title', value: 'Artist'}, 
    {key: 'date_start', value: 'Date'}
  ]
  FilterArtworkOption: FilterArtworkOption[] = []

  filterForm = this.fb.group({
    filterArtwork: '',
    sortArtwork: ''
  });

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
    console.log('change filter', this.form)
  }

  onChangeSorting() {
    console.log('change sorting', this.form)
  }

  getArtWorks() {
    let params = new HttpParams();
    params = params.append('page', this.page);
    params = params.append('limit', this.perPage);
    this.artworks = this.artWorkService.getArtWorks(params).pipe(
      map(res => {
        this.FilterArtworkOption = this.filterArtworkOptionData(res.data);
        return res.data;
      }),
      catchError(err => {
        return of ([]);
      })
    )

    console.log('data', this.artworks);
  }

  filterArtworkOptionData(data: Artwork[]): FilterArtworkOption[] {
    const filterArr: FilterArtworkOption[] = []
    data.forEach((data: Artwork) => {
      // length = data.filter(function(item){
      //   return item.style_titles;
      // }).length;

      if (data.style_titles) {
        data.style_titles.forEach((val: string) => {
          const index = filterArr.findIndex(x => x.title == val)
          if(index > 1){
            filterArr[index].count++;
          }
          else{
            filterArr.push({
              count: 1, 
              title: val
            })
          }
        }) 
      }

    })
    console.log('filterArr', filterArr)
    return filterArr;
  }

  filterAndSortArtwork() {
   
  }

}
