import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces';

@Component({
  selector: '[app-article-overview]',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss']
})
export class ArticleOverviewComponent implements OnInit {
  @Input() public article: Article;
  @Input() public tagColors: String[];

  constructor() {}

  ngOnInit() {}

  public getHref(path) {
    return `#/article/${encodeURIComponent(path)}`;
  }
}
