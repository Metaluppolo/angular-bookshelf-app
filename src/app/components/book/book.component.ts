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
      this.book.ISBN = parseInt(params.get('isbn')!);
      this.getBookInfo();
    })
  }

  private getBookInfo() {
    this.bookshelfService.getBook(this.book.ISBN).subscribe((res: any) => {
      this.book = res.data[0];
      const substring = this.book.plot.slice(0,150);
      this.book.plot_start = substring.split(' ').slice(0, -1).join(" ");
      this.book.plot_end = this.book.plot.split(this.book.plot_start).join(" ");
    });
  }

}
