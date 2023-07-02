import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { BookModel } from 'src/app/models/book.model';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: BookModel = new BookModel();
  selectedOpinion = "";

  constructor(private route: ActivatedRoute, private router: Router, private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const isbn = parseInt(params.get('isbn')!);
      this.getBookInfo(isbn);
    })
  }

  onChangeOpinion(event: any, group: MatButtonToggleGroup) {
    console.log("change")
    if (this.selectedOpinion === event.value) {
      group.value = "";
      this.selectedOpinion = "";
    } else {
      this.selectedOpinion = event.value;
    }
  }

  onClickDelete() {
    this.bookshelfService.removeBook(this.book.ISBN).subscribe();
    this.bookshelfService.closeDrawer();
    this.router.navigate(['/']);
  }

  private getBookInfo(isbn: number) {
    this.bookshelfService.getBook(isbn).subscribe((res: any) => {
      this.book = res.data[0];
      this.initSelectedOpinionValue();
    });
  }

  private initSelectedOpinionValue() {
    this.selectedOpinion = (this.book.isRecommended === "true") ? "like" : "";
    this.selectedOpinion = (this.book.isRecommended === "false") ? "dislike" : this.selectedOpinion;
  }

}
