import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpConstants } from '../constants/http.constants';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMissingBook(title: string) {
    let url = `${HttpConstants.BOOKS}?missingTo=${this.authService.user?.email}&title=${title}`;
    return this.http.get(url);
  }

  getMissingBooks(booksPerPage: number | null = null, page: number | null = null) {
    let url = `${HttpConstants.BOOKS}?missingTo=${this.authService.user?.email}`;
    if (page != null) { url += `&page=${page}`; }
    if (booksPerPage != null) { url += `&booksPerPage=${booksPerPage}`; }

    return this.http.get(url);
  }
}
