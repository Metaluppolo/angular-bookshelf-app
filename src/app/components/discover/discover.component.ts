import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { DiscoverService } from 'src/app/services/discover.service';

const BOOKS_PER_PAGE = 4

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit{
  books: BookModel[] = [];
  currentPage: number = 1;

  constructor(private discoverService: DiscoverService, private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this._getBooks();
  }

  onClickAdd(target: Element, info: BookModel) {
    if (!target) { 
      return; 
    }
    this.bookshelfService.addBook(info.ISBN).subscribe((data) => {
      console.log(data);
    });
    this._hideElement(target);
  }

  onClickShowMore() {
    this.currentPage++;
    this._getBooks();
  }

  private _getBooks() {
    this.discoverService.getMissingBooks(BOOKS_PER_PAGE, this.currentPage).subscribe((res: any) => {
      const data = res.data;
      const array = Object.keys(data).map((key) => { 
        return data[key];
      });
      array.forEach(element => {
        this.books.push(element);
      });
    });
  }

  private _hideElement(elem: Element) {
    elem.classList.add("hidden");
  }

}
