import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConstants } from '../constants/http.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(HttpConstants.USERS);
  }

  //isValidUser() {}
}
