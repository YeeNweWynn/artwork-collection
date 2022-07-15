import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  BASE_URL = environment.url;

  constructor( private httpClient: HttpClient) { }

  getArtWorks(params: any): Observable<any> {
   
    return this.httpClient.get(`${ this.BASE_URL }`,{ params })
  }
}
