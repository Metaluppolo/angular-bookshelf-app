import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';

const MAX_CHARS = 140;

@Injectable({
  providedIn: 'root'
})
export class BookCardService {

  constructor() { }

  splitPlotString(book: BookModel) {
    const substring = book.plot.slice(0, MAX_CHARS);
    book.plot_start = substring.split(' ').slice(0, -1).join(" ");
    book.plot_end = book.plot.split(book.plot_start).join(" ");
  }

}
