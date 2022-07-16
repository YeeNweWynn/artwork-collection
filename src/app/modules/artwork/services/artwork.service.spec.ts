import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ArtworkService } from './artwork.service';

describe('ArtworkService', () => {
  let service: ArtworkService;
  let httpController: HttpTestingController;
  let params: any;
  let url = 'https://api.artic.edu/api/v1/';
  let apiServiceStub: Partial<ArtworkService>;
  const artWorkData = {
    "style_titles": [],
    "id": 216543,
    "image_id": "fc8fdb6b-cc7c-fa24-7640-8054e97724f5",
    "title": "Human Nature/Life Death",
    "artist_title": "André Kertész",
    "place_of_origin": "United States",
    "medium_display": "Gelatin silver print",
    "date_start": 1983,
    "date_end": 1983,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtworkService);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ArtworkService);
  });

  
	it('should call getArtWorks and return an observable of artworks', () => {
			
    service.getArtWorks(params).subscribe((res) => {
      expect(res).toEqual(artWorkData);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/artworks`,
    });
    req.flush(artWorkData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

