import { Injectable } from '@angular/core';
import { faHome, faTags } from '@fortawesome/free-solid-svg-icons';
import siteConfig from '../../_config';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

import { PageMenu, SiteConfig } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ViewStoreService {
  private scrollListeners = {};
  private scrollBarRef: PerfectScrollbarComponent;
  public siteConfig: SiteConfig = siteConfig;
  public sideMenuVisible: Boolean;
  public pageHeaderFixed: Boolean;
  public pageTitle: String;
  public pageMenus: PageMenu[] = [
    { name: '首页', href: 'home', icon: faHome }
    // { name: '标签', href: 'tags', icon: faTags }
  ];

  public setPageTitle(title: String): void {
    this.pageTitle = title;
  }

  public setPageHeaderFixed(fixed: Boolean): void {
    this.pageHeaderFixed = fixed;
  }

  public setScrollRef(scrollBarRef: PerfectScrollbarComponent): void {
    this.scrollBarRef = scrollBarRef;
  }

  public onScrollToY(top: number): void {
    this.scrollBarRef.directiveRef.scrollToY(top);
  }

  public onChangeSideMenuLayout(): void {
    this.sideMenuVisible = !this.sideMenuVisible;
  }

  public addScrollListener(key: string, fun: Function) {
    this.scrollListeners[key] = fun;
  }

  public removeScrollListener(key: string) {
    this.scrollListeners[key] = undefined;
  }

  public onMainScroll(top: number): void {
    const keys = Object.keys(this.scrollListeners);

    keys.forEach(key => {
      if (this.scrollListeners[key]) {
        this.scrollListeners[key](top);
      }
    });
  }
}
