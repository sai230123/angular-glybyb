import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { URL_CONFIG } from './model/capstone.constants';
import { Actor, ActorResponse, CapstoneResponse, LoginRequest, Movie, MovieResponse, Review, ReviewResponse } from './model/capstone.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapstoneService {

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post<CapstoneResponse>("http://localhost:8080" + URL_CONFIG.LOGIN, loginRequest);
  }

  getAllActors() {
    return this.http.get<ActorResponse>("http://localhost:8080" + URL_CONFIG.ALL_ACTORS);
  }


  getAllReviews() {
    return this.http.get<ReviewResponse>("http://localhost:8080" + URL_CONFIG.ALL_REVIEWS);
  }


  getAllMovies() {
    return this.http.get<MovieResponse>("http://localhost:8080" + URL_CONFIG.ALL_MOVIES);
  }

  uploadMovie(file: any, movie: Movie, isEditFlow: boolean) {
    const formData: FormData = new FormData();

    formData.append('file', movie.photo);
    formData.append('title', movie.title);
    formData.append('cost', movie.cost);
    formData.append('year', movie.year);
    formData.append('actor', movie.actor);
    if (isEditFlow) {
      formData.append('id', movie.id + '');
    }

    let url = isEditFlow ? URL_CONFIG.EDIT_MOVIE : URL_CONFIG.SAVE_MOVIE;

    return this.http.post<MovieResponse>("http://localhost:8080" + url, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  getFiles() {
    return this.http.get("http://localhost:8080" + URL_CONFIG.DELETE_ACTOR);
  }


  saveActors(actorReq: Actor, isEditFlow: boolean) {
    let url = isEditFlow ? URL_CONFIG.EDIT_ACTOR : URL_CONFIG.SAVE_ACTOR;
    return this.http.post<ActorResponse>("http://localhost:8080" + url, actorReq);
  }

  deleteActor(id: any) {
    return this.http.post<ActorResponse>("http://localhost:8080" + URL_CONFIG.DELETE_ACTOR, id);
  }


  saveReviews(actorReq: Review, isEditFlow: boolean) {
    let url = isEditFlow ? URL_CONFIG.EDIT_REVIEW : URL_CONFIG.SAVE_REVIEW;
    return this.http.post<ReviewResponse>("http://localhost:8080" + url, actorReq);
  }

  deleteReview(id: any) {
    return this.http.post<ReviewResponse>("http://localhost:8080" + URL_CONFIG.DELETE_REVIEW, id);
  }

  deleteMovie(id: any) {
    return this.http.post<ActorResponse>("http://localhost:8080" + URL_CONFIG.DELETE_MOVIE, id);
  }

}
