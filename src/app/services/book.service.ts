import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConstants } from '../constants/http.constants';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBooks() {
    return this.http.get(`${HttpConstants.BOOKS}`);
  }

  getBooksFiltered() {
    return this.http.get(`${HttpConstants.BOOKS}?missingTo=${this.authService.user?.email}`);
  }

}
