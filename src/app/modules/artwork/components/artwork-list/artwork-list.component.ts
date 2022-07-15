import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs'
import { HttpParams } from '@angular/common/http';
import { FormBuilder } from "@angular/forms";

import { ArtworkService } from '../../services/artwork.service';
import { Artwork, DropdownOption } from '../../models/artwork';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {

  artworks: Artwork[] = [];  
  filteredArtwork!: Observable<Artwork[]>;
  sortOption: DropdownOption[] = [
    {key: '', value: 'Recommendation'}, 
    {key: 'title', value: 'Name'}, 
    {key: 'artist_title', value: 'Artist'}, 
    {key: 'date_start', value: 'Date'}
  ]

  page: number = 1;
  perPage: number = 8;

  constructor(
    private artWorkService: ArtworkService,
  ) { }

  ngOnInit(): void {
     this.getArtWorks();
  }

  getArtWorks() {
    let params = new HttpParams();
    params = params.append('page', this.page);
    params = params.append('limit', this.perPage);
    this.artWorkService.getArtWorks(this.page).subscribe((res)=>{
      this.artworks = res.data;
      console.log(res.data)
    })
      
  }

}
