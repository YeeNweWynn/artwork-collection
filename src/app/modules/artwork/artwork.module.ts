import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ArtworkRoutingModule } from './artwork-routing.module';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';


@NgModule({
  declarations: [
    ArtworkListComponent
  ],
  imports: [
    CommonModule,
    ArtworkRoutingModule,
    SharedModule
  ]
})
export class ArtworkModule { }
