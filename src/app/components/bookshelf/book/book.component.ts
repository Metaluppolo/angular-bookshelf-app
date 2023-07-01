import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { BookModel } from 'src/app/models/book.model';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: BookModel = new BookModel();

  constructor(private route: ActivatedRoute, private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const isbn = parseInt(params.get('isbn')!);
      this.getBookInfo(isbn);
    })
  }

  private getBookInfo(isbn: number) {
    this.bookshelfService.getBook(isbn).subscribe((res: any) => {
      this.book = res.data[0];
    });
  }

}
