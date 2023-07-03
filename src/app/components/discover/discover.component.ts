import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { DiscoverService } from 'src/app/services/discover.service';

const BOOKS_PER_PAGE = 4;
const FIRST_PAGE = 1;

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit, AfterContentChecked{
  books: BookModel[] = [];
  autocompleteOptions: string[] = [];
  currentPage: number = FIRST_PAGE;
  isShowMoreDisabled: boolean = false;

  constructor(private discoverService: DiscoverService, private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this._getBooks();
  }

  ngAfterContentChecked(): void {
    this._getAutocompleteOptions();
  }

  onClickAdd(book: BookModel) {
    this.bookshelfService.addBook(book.ISBN).subscribe((data) => {
      console.log(data);
    });
    this._removeElement(book.ISBN);
  }

  onClickShowMore() {
    this.currentPage++;
    this._getBooks();
  }

  onReceiveSearchValue(title: string) {
    this.isShowMoreDisabled = false;
    this.currentPage = FIRST_PAGE;
    if (title ==  "") {
      this.books = [];
      this._getBooks();
    } else {
      this.isShowMoreDisabled = true;
      this._searchBook(title);
    }
  }

  private _searchBook(title: string) {
    this.discoverService.getMissingBook(title).subscribe((res: any) => {
      const data = res.data;
      this.books = Object.keys(data).map((key) => { 
        return data[key];
      });
    });
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

  private _removeElement(isbn: number) {
    const index = this.books.findIndex(book => book.ISBN == isbn);
    this.books.splice(index,1);
  }

  private _getAutocompleteOptions() {
    this.autocompleteOptions = this.books.map((book) => {
      return book.title
    })
  }

}
