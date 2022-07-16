import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxImageModule } from '@aposin/ng-aquila/image';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxDataDisplayModule } from '@aposin/ng-aquila/data-display';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';


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
    FormsModule,
    ReactiveFormsModule,
    NxSpinnerModule,
    NxGridModule,
    NxCardModule,
    NxFormfieldModule,
    NxDropdownModule,
    NxImageModule,
    NxDataDisplayModule,
    NxPaginationModule
  ]
})
export class ArtworkModule { }
