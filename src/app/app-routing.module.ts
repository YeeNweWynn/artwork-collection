import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkModule } from './modules/artwork/artwork.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/artwork/artwork.module').then(m => m.ArtworkModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
