import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
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
  public preArticle = { disabled: true, title: '没有上一篇', href: 'javascript:;' };
  public nextArticle = { disabled: true, title: '没有下一篇', href: 'javascript:;' };
  public html: SafeHtml;
  public headers: ArticleHeader[];
  public activeHeader: String;
  public siteConfig: SiteConfig;

  public preIcon = faAngleLeft;
  public nextIcon = faAngleRight;

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewStoreService: ViewStoreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const path = params.get('path');
      const index = articles.findIndex(a => a.path === path);
      const article = articles[index];
      const page = getArticlePage(article);

      if (index > 1) {
        const pre = articles[index - 1];

        this.preArticle = { href: `/#/article/${encodeURIComponent(pre.path)}`, disabled: false, title: pre.title };
      }
      if (index < articles.length - 2) {
        const next = articles[index + 1];

        this.nextArticle = { href: `/#/article/${encodeURIComponent(next.path)}`, disabled: false, title: next.title };
      }

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
