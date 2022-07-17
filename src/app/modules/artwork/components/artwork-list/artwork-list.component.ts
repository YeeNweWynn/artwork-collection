import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { HttpErrorResponse } from '@angular/common/http';

import { ArtworkService } from '../../services/artwork.service';
import { 
  IArtwork, 
  IDropdownOption, 
  IFilterArtworkOption,
  ArtWorkFilter,
  Pagination,
} from '../../models/artwork';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {
  artworks: IArtwork[] = [];
  tempArtworks: IArtwork[] = [];
  sortOption: IDropdownOption[] = [
    { key: ArtWorkFilter.recommendation, value: 'Recommendation' },
    { key: ArtWorkFilter.title, value: 'Name' },
    { key: ArtWorkFilter.artist_title, value: 'Artist' },
    { key: ArtWorkFilter.date, value: 'Date' },
  ]
  filterArtworkOption: IFilterArtworkOption[] = []
  filterForm = this.fb.group({
    filterArtwork: [''],
    sortArtwork: [''],
  })
 
  isLoading:boolean = false;
  imageUrl: string = '';
  count = Pagination.count;
  page = Pagination.page;
  perPage = Pagination.perPage;

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

  selectLabel(option: IFilterArtworkOption): string {
    return `${option.title} (${option.count})`;
  }

  selectValue(option: IFilterArtworkOption): string {
    return option.title;
  }

  /** get artworks by filtered value  */
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

  /** get artworks by sorting value*/
  onChangeSorting() {
    /* reset pagination after sorting change */
    this.page = 1;
    this.perPage = 8;
    this.getArtWorks();
  }

  /** get artworks list with query params and pagination*/
  getArtWorks() {
    const params = {
      page: this.page,
      limit: this.perPage,
    };
    this.isLoading = true;
    const sortBy = this.form['sortArtwork'].value;
    this.artWorkService.getArtWorks(params, sortBy).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.filterArtworkOption = this.filterArtworkOptionData(res.data);
        this.imageUrl = res.config.iiif_url;
        this.page = res.pagination.current_page;
        this.perPage = res.pagination.limit;
        this.count = res.pagination.total_pages;
        this.artworks = res.data;
        this.tempArtworks = res.data;
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.artworks = [];
        this.tempArtworks = [];
        this.filterArtworkOption = [];
      }
    );
  }

  /**Gather style_titles and set count */
  filterArtworkOptionData(data: IArtwork[]): IFilterArtworkOption[] {
    const filterArr: IFilterArtworkOption[] = [];
    data.forEach((data: IArtwork) => {
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

  private changePage() {
    this.form['filterArtwork'].reset();
    this.getArtWorks();
  }
  
  prevPage() {
    this.page--;
    this.changePage();
  }

  nextPage() {
    this.page++;
    this.changePage();
  }

  goToPage(n: number) {
    this.page = n;
    this.changePage();
  }

}
