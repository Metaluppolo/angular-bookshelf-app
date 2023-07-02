import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { BookModel } from 'src/app/models/book.model';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent implements OnInit, AfterContentChecked, AfterViewInit {
  @ViewChild('drawer') drawerRef!: MatDrawer;
  books: BookModel[] = [ ];

  constructor(private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.bookshelfService.getBooks().subscribe((res: any) => {
      const data = res.data;
      this.books = Object.keys(data).map((key) => { 
        return data[key];
      });
    });
  }

  ngAfterContentChecked(): void {
    this.removeBookFromView();
  }

  ngAfterViewInit(): void {
    this.bookshelfService.setDrawer(this.drawerRef);
  }

  private removeBookFromView() {
    const deletedIsbn = this.bookshelfService.getDeletedIsbn();
    if (deletedIsbn) {
      this.books = this.books.filter(book => book.ISBN != deletedIsbn);
    }
  }

}
