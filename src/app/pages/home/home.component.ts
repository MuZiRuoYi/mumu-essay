import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../interfaces';
import { ViewStoreService } from '../../stores/view-store.service';
import articles from '../../../assets/articles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public articles: Article[] = [];
  public total: Number = 0;
  public currentPage: number;
  public showPagination: Boolean;
  public onBindPageChange: Function;

  constructor(
    public viewStoreService: ViewStoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const pageSize = this.viewStoreService.siteConfig.pageSize;

    this.currentPage = 1;
    this.viewStoreService.setPageTitle(this.viewStoreService.siteConfig.siteTitle);
    this.onBindPageChange = this.onPageChange.bind(this);
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const currentPage = params.get('page');
      if (currentPage) {
        this.currentPage = +currentPage;
      }
      this.articles = articles.slice(pageSize * (this.currentPage - 1), pageSize * this.currentPage);
      this.total = articles.length;
      this.showPagination = this.total > this.viewStoreService.siteConfig.pageSize;
    });
  }

  public onPageChange(page: number) {
    this.router.navigateByUrl(`/home${page > 1 ? '/' + page : ''}`);
  }
}
