import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './actors/actors.component';
import { HomeComponent } from './home.component';
import { MoviesComponent } from './movies/movies.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MoviesComponent
      },
      {
        path: 'actors',
        component: ActorsComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      },
      {
        path: 'movies',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
