import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkWrapperComponent } from './components/artwork-wrapper/artwork-wrapper.component';

const routes: Routes = [{ path: '', component: ArtworkWrapperComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtworkRoutingModule { }
