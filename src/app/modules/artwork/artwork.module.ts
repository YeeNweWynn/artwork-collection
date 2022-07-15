import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { NxCardModule } from '@aposin/ng-aquila/card';

import { ArtworkRoutingModule } from './artwork-routing.module';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';
import { ArtworkWrapperComponent } from './components/artwork-wrapper/artwork-wrapper.component';


@NgModule({
  declarations: [
    ArtworkListComponent,
    ArtworkWrapperComponent
  ],
  imports: [
    CommonModule,
    ArtworkRoutingModule,
    SharedModule,
    NxSpinnerModule,
    NxCardModule
  ]
})
export class ArtworkModule { }
