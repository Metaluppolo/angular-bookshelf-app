import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookCardService {

  constructor() { }

  splitPlotString(book: BookModel) {
    const substring = book.plot.slice(0,150);
    book.plot_start = substring.split(' ').slice(0, -1).join(" ");
    book.plot_end = book.plot.split(book.plot_start).join(" ");
  }

}
