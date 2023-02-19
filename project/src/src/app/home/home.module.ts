import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { MoviesComponent } from './movies/movies.component';
import { ActorsComponent } from './actors/actors.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    HomeComponent,
    LandingHeaderComponent,
    MoviesComponent,
    ActorsComponent,
    ReviewsComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
