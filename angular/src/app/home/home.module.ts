import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { MoviesComponent } from './movies/movies.component';
import { ActorsComponent } from './actors/actors.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';


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
    HomeRoutingModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapIconsModule.pick(allIcons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class HomeModule { }
