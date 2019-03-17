import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() private total: number;
  @Input() private pageSize: number;
  @Input() public currentPage: number;
  @Input() public onPageChange: Function;
  private maxPageNumber = 4;
  public pages: string[] = [];

  constructor() {}

  ngOnInit() {
    if (this.total > this.pageSize) {
      this.pages = this.getPages();
    }
  }

  public onSwitchPage(page: string | number) {
    const pageNumber = +page;

    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.onPageChange(+page);
    }
  }

  private getPages(): string[] {
    const maxPageNumber = this.maxPageNumber;
    const pageTotal = Math.ceil(this.total / this.pageSize);
    let pages: string[];

    if (pageTotal <= 5) {
      pages = new Array(pageTotal).fill('').map((s, index) => (++index).toString());
    } else if (this.currentPage <= maxPageNumber) {
      pages = new Array(maxPageNumber - 1)
        .fill('')
        .map((s, index) => (++index).toString())
        .concat(['...', pageTotal.toString()]);
    } else if (pageTotal - this.currentPage <= maxPageNumber - 1) {
      pages = ['1', '...'].concat(
        new Array(maxPageNumber).fill('').map((s, index) => (pageTotal - (maxPageNumber - 1) + index).toString())
      );
    } else {
      pages = ['1', '...'].concat(
        new Array(maxPageNumber)
          .fill('')
          .map((s, index) => (this.currentPage - Math.floor((maxPageNumber - 1) / 2) + index).toString()),
        ['...', pageTotal.toString()]
      );
    }

    return pages;
  }
}
