import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TSortKey } from '../models/artwork';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  fields = 'fields=id,title,artist_title,image_id,date_start,date_end,place_of_origin,medium_display,style_titles';
  BASE_URL = `${environment.url}/artworks/search?${this.fields}`;

  constructor( private httpClient: HttpClient) { }

  getArtWorks(params: any, sortKey: TSortKey): Observable<any> {
    const sortQuery = sortKey ? `&sort[${sortKey}][order]=desc` : '';
    return this.httpClient.get(this.BASE_URL + sortQuery, { params });
  }
}
