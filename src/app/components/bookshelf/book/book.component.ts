import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { BookModel } from 'src/app/models/book.model';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: BookModel = new BookModel();
  bookform!: FormGroup;
  selectedOpinion = "";

  constructor(private route: ActivatedRoute, private router: Router, private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const isbn = parseInt(params.get('isbn')!);
      this._getBookInfo(isbn);
      this._setBookform();
    });
  }

  onClickDelete() {
    this.bookshelfService.removeBook(this.book.ISBN).subscribe();
    this.bookshelfService.closeDrawer();
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.bookshelfService.updateBook(this.book.ISBN, this.bookform.value).subscribe();
    this.bookform.markAsPristine();
  }

  private _setBookform() {
    this.bookform = new FormGroup({
      bookmark_page: new FormControl(),
      readings_counter: new FormControl(),
      opinion: new FormControl(),
      review: new FormControl()
    });
  }

  private _getBookInfo(isbn: number) {
    this.bookshelfService.getBook(isbn).subscribe((res: any) => {
      this.book = res.data[0];
    });
  }

}
