import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SongSearchComponent} from './song-search/song-search.component';
import {SongCreateComponent} from './song-create/song-create.component';

const routes: Routes = [
    { path: 'song-search', component: SongSearchComponent },
    { path: 'song-create', component: SongCreateComponent }
];

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
