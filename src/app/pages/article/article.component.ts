import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { Article, ArticleHeader, SiteConfig } from '../../interfaces';
import { articles, getArticlePage } from '../../../assets/articles';
import { ViewStoreService } from '../../stores/view-store.service';

@Component({
  selector: 'page-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  private hasGetHeaderTop = false;
  public pocTop = 240;
  public article: Article;
  public html: SafeHtml;
  public headers: ArticleHeader[];
  public activeHeader: String;
  public siteConfig: SiteConfig;

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewStoreService: ViewStoreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const path = params.get('path');
      const article = articles.find(a => a.path === path);
      const page = getArticlePage(article);

      this.article = article;
      this.html = page.html;
      this.headers = page.headers;
      this.activeHeader = this.headers[0].number;
    });
    this.viewStoreService.addScrollListener('article.toc', this.onMainScroll.bind(this));
    this.siteConfig = this.viewStoreService.siteConfig;
    window.addEventListener('resize', this.getHeaderTop.bind(this));
  }

  ngOnDestroy(): void {
    this.viewStoreService.removeScrollListener('article.toc');
    window.removeEventListener('resize', this.getHeaderTop.bind(this));
  }

  private getHeaderTop(): void {
    const doc = window.document;

    this.headers.forEach(h => {
      const hDom = doc.getElementById(h.text as string);

      h.top = hDom ? hDom.getClientRects()[0].top : 0;
    });
    this.hasGetHeaderTop = true;
  }

  private onMainScroll(top: number): void {
    let pocTop = 240 - top;

    if (pocTop < 72) {
      pocTop = 72;
    }
    if (top >= 100) {
      this.viewStoreService.setPageTitle(this.article.title);
    }
    if (!this.hasGetHeaderTop) {
      this.getHeaderTop();
    }

    const activeHeader = this.headers.find(h => top - h.top <= 56);

    if (activeHeader) {
      this.activeHeader = activeHeader.number;
    }

    this.pocTop = pocTop;
    this.cdr.detectChanges();
  }

  public scrollToHeader(header: ArticleHeader): void {
    if (!this.hasGetHeaderTop) {
      this.getHeaderTop();
    }

    this.viewStoreService.onScrollToY(header.top - 56);
  }
}
