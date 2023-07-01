import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConstants } from '../constants/http.constants';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class BookshelfService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBooks() {
    return this.http.get(`${HttpConstants.BOOKSHELF}/${this.authService.user!.email}`);
  }

  getBook(isbn: number) {
    return this.http.get(`${HttpConstants.BOOKSHELF}/${this.authService.user!.email}?book=${isbn}`);
  }

  addBook(isbn: number) {
    const body = { 
      user: this.authService.user!.email, 
      isbn: isbn 
    }
    return this.http.post(`${HttpConstants.BOOKSHELF}`, body);
  }

}
