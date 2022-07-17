import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ArtWorkFilter } from '../models/artwork';
import { ArtworkService } from './artwork.service';

describe('ArtworkService', () => {
  let service: ArtworkService;
  let httpController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ArtworkService]
    });
    service = TestBed.inject(ArtworkService);
    httpController = TestBed.inject(HttpTestingController);
  });

  describe('getArtWorks', () => {
    it('should call correct url', () => {
      //given
      const mockResponse = {
        "preference": null,
        "pagination": {
          "total": 116178,
          "limit": 8,
          "offset": 0,
          "total_pages": 14523,
          "current_page": 1
        },
        "data": [
          {
            "_score": 23580.172,
            "date_start": 1972,
            "style_titles": [
              "contemporary"
            ],
            "medium_display": "Acrylic on canvas",
            "date_end": 1972,
            "artist_title": "Alma Thomas",
            "id": 129884,
            "image_id": "e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9",
            "title": "Starry Night and the Astronauts",
            "place_of_origin": "United States"
          },
          {
            "_score": 11790.086,
            "date_start": 1889,
            "style_titles": [
              "Post-Impressionism"
            ],
            "medium_display": "Oil on canvas",
            "date_end": 1889,
            "artist_title": "Vincent van Gogh",
            "id": 28560,
            "image_id": "25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e",
            "title": "The Bedroom",
            "place_of_origin": "Saint-R\u00e9my-de-Provence"
          },
          {
            "_score": 7860.057,
            "date_start": 1101,
            "style_titles": [
              "South Asian",
              "chola"
            ],
            "medium_display": "Granite",
            "date_end": 1200,
            "artist_title": null,
            "id": 21023,
            "image_id": "0675f9a9-1a7b-c90a-3bb6-7f7be2afb678",
            "title": "Buddha Shakyamuni Seated in Meditation (Dhyanamudra)",
            "place_of_origin": "Nagapattinam"
          },
          {
            "_score": 5895.043,
            "date_start": 1994,
            "style_titles": [
              "contemporary"
            ],
            "medium_display": "Acrylic on paper mounted on canvas",
            "date_end": 1994,
            "artist_title": "Kerry James Marshall",
            "id": 137125,
            "image_id": "d94d0e3d-5d89-ce07-ee0f-7fa6d8def8ab",
            "title": "Many Mansions",
            "place_of_origin": "United States"
          },
          {
            "_score": 2358.017,
            "date_start": 1964,
            "style_titles": [
              "Gutai group"
            ],
            "medium_display": "Enamel on canvas",
            "date_end": 1964,
            "artist_title": "Tanaka Atsuko",
            "id": 229393,
            "image_id": "7690dd6e-05ed-773c-a80e-e7cc4eb879cc",
            "title": "Untitled",
            "place_of_origin": null
          },
          {
            "_score": 1965.0143,
            "date_start": 1877,
            "style_titles": [
              "Impressionism"
            ],
            "medium_display": "Oil on canvas",
            "date_end": 1877,
            "artist_title": "Gustave Caillebotte",
            "id": 20684,
            "image_id": "f8fd76e9-c396-5678-36ed-6a348c904d27",
            "title": "Paris Street; Rainy Day",
            "place_of_origin": "Paris"
          },
          {
            "_score": 1684.298,
            "date_start": 1884,
            "style_titles": [
              "Impressionism",
              "Post-Impressionism"
            ],
            "medium_display": "Oil on canvas",
            "date_end": 1886,
            "artist_title": "Georges Seurat",
            "id": 27992,
            "image_id": "2d484387-2509-5e8e-2c43-22f9981972eb",
            "title": "A Sunday on La Grande Jatte \u2014 1884",
            "place_of_origin": "France"
          },
          {
            "_score": 1473.7607,
            "date_start": 1936,
            "style_titles": [
              "Modernism"
            ],
            "medium_display": "Tempera and oil on canvas",
            "date_end": 1936,
            "artist_title": "Diego Rivera",
            "id": 151363,
            "image_id": "96e26f4f-c578-b14c-2714-2a565f19e0d0",
            "title": "Weaving",
            "place_of_origin": "M\u00e9xico"
          }
        ],
        "info": {
          "license_text": "The data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.",
          "license_links": [
            "https:\/\/creativecommons.org\/publicdomain\/zero\/1.0\/",
            "https:\/\/www.artic.edu\/terms"
          ],
          "version": "1.4"
        },
        "config": {
          "iiif_url": "https:\/\/www.artic.edu\/iiif\/2",
          "website_url": "http:\/\/www.artic.edu"
        }
      };
      const expMethod = 'GET';
      const fields = 'fields=id,title,artist_title,image_id,date_start,date_end,place_of_origin,medium_display,style_titles&sort[aa][order]=desc';
      const expURL = `${environment.url}/artworks/search?${fields}`;
      let responseMsg;

      //when
      service.getArtWorks('aa',ArtWorkFilter.date).subscribe(res => {
        responseMsg = res;
      });

      //then
      const req = httpController.expectOne((req: HttpRequest<any>) => req.method == expMethod);
      expect(req.request.method).toBe(expMethod);
      expect(req.request.url).toBe(expURL);

    });
  });
});

