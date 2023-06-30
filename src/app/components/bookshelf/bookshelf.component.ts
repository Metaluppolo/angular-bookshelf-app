import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BookshelfService } from 'src/app/services/bookshelf.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent implements OnInit{
  books: any[] = [ ];

  constructor(private bookshelfService: BookshelfService, private sanitizer: DomSanitizer) { }

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
