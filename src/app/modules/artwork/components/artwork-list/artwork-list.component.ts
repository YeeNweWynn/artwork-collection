import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs'
import { ArtworkService } from '../../services/artwork.service';
import { Artwork, DropdownOption } from '../../models/artwork';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {

  artworks!: Observable<Artwork[]>;
  filteredArtwork!: Observable<Artwork[]>;
  sortOption: DropdownOption[] = [
    {key: '', value: 'Recommendation'}, 
    {key: 'title', value: 'Name'}, 
    {key: 'artist_title', value: 'Artist'}, 
    {key: 'date_start', value: 'Date'}
  ]

  page: number = 1;

  constructor(
    private artWorkService: ArtworkService,
  ) { }

  ngOnInit(): void {
    this.getArtWorks();
  }

  private getArtWorks(){
    
  }

}
