import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConstants } from '../constants/http.constants';
import { AuthService } from '../auth/auth.service';
import { MatDrawer } from '@angular/material/sidenav';


@Injectable({
  providedIn: 'root'
})
export class BookshelfService {
  private _drawer!: MatDrawer;
  private _updatedIsbn: number | undefined;
  private _deletedIsbn: number | undefined;

  constructor(private http: HttpClient, private authService: AuthService) { }

  setDrawer(drawer: MatDrawer) {
    this._drawer = drawer;
  }

  closeDrawer() {
    this._drawer.close();
  }

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

  updateBook(isbn: number, values: any) {
    this._updatedIsbn = isbn;
    return this.http.put(`${HttpConstants.BOOKSHELF}/${this.authService.user!.email}/${isbn}`, values);
  }

  removeBook(isbn: number) {
    this._deletedIsbn = isbn;
    return this.http.delete(`${HttpConstants.BOOKSHELF}/${this.authService.user!.email}/${isbn}`);
  }

  getUpdatedIsbn() : number | undefined {
    const isbn = this._updatedIsbn;
    this._updatedIsbn = undefined;
    return isbn;
  }

  getDeletedIsbn() : number | undefined {
    const isbn = this._deletedIsbn;
    this._deletedIsbn = undefined;
    return isbn;
  }

}
