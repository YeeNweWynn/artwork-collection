import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artwork } from '../models/artwork';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  BASE_URL = environment.url;

  constructor( private httpClient: HttpClient) { }

  getArtWorks(page: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    return this.httpClient.get(`${ this.BASE_URL }`,{ params })
  }
}
