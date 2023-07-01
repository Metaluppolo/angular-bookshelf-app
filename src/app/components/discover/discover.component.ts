import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit{
  books: BookModel[] = []

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooksFiltered().subscribe((res: any) => {
      const data = res.data;
      this.books = Object.keys(data).map((key) => { 
        return data[key];
      });
    });
  }

}
