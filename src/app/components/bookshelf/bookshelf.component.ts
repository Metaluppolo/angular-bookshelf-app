import { Component, OnInit } from '@angular/core';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { BookModel } from 'src/app/models/book.model';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent implements OnInit{
  books: BookModel[] = [ ];

  constructor(private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.bookshelfService.getBooks().subscribe((res: any) => {
      const data = res.data;
      this.books = Object.keys(data).map((key) => { 
        return data[key];
      });
      //console.log(this.books)
    });
  }

}
