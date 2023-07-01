import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpConstants } from '../constants/http.constants';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBooksAll() {
    return this.http.get(`${HttpConstants.BOOKS}`);
  }

  getBooksFiltered() {
    return this.http.get(`${HttpConstants.BOOKS}?missingTo=${this.authService.user?.email}`);
  }
}
