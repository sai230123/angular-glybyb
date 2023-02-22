import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_CONFIG } from './model/capstone.constants';
import { Actor, ActorResponse, CapstoneResponse, LoginRequest } from './model/capstone.model';

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

  
  saveActors(actorReq: Actor, isEditFlow: boolean) {
    let url  = isEditFlow? URL_CONFIG.EDIT_ACTOR : URL_CONFIG.SAVE_ACTOR;
    return this.http.post<ActorResponse>("http://localhost:8080" + url, actorReq);
  }
  
  deleteActor(id: any) {
   return this.http.post<ActorResponse>("http://localhost:8080" + URL_CONFIG.DELETE_ACTOR, id);
  }

}
