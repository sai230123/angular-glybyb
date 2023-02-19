import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_CONFIG } from './model/capstone.constants';
import { CapstoneResponse, LoginRequest } from './model/capstone.model';

@Injectable({
  providedIn: 'root'
})
export class CapstoneService {

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post<CapstoneResponse>("http://localhost:8080"+URL_CONFIG.LOGIN, loginRequest);
  }

}
