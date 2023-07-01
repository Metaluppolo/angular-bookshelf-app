import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { DiscoverService } from 'src/app/services/discover.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit{
  books: BookModel[] = []

  constructor(private discoverService: DiscoverService) { }

  ngOnInit(): void {
    this.discoverService.getBooksFiltered().subscribe((res: any) => {
      const data = res.data;
      this.books = Object.keys(data).map((key) => { 
        return data[key];
      });
    });
  }

}
