import { Component, Input, OnChanges } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { BookCardService } from 'src/app/services/bookcard.service';


@Component({
  selector: 'app-bookcard',
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.scss']
})
export class BookcardComponent implements OnChanges{
  @Input() book: BookModel = new BookModel();

  constructor(private bookcardService: BookCardService) { };

  ngOnChanges(): void {
    this.bookcardService.splitPlotString(this.book);
  }

}
