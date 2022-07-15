import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline'

import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NxHeadlineModule
  ],
  exports: [
    HeaderComponent    
  ]
})
export class SharedModule { }
