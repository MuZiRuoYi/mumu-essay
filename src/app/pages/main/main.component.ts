import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { init, attach } from 'node-waves';
import {
  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { ViewStoreService } from '../../stores/view-store.service';

@Component({
  selector: '[app-main]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss', '../../styles/index.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = { swipeEasing: true, wheelPropagation: true };
  public headerFixed: Boolean;
  public onBindChangeSideMenuLayout: Function;

  @ViewChild(PerfectScrollbarComponent) scrollBarRef?: PerfectScrollbarComponent;

  constructor(public viewStoreService: ViewStoreService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    init();
    attach('.waves');
    this.onBindChangeSideMenuLayout = this.onChangeSideMenuLayout.bind(this);
    this.viewStoreService.setScrollRef(this.scrollBarRef);
  }

  private onChangeSideMenuLayout() {
    this.viewStoreService.onChangeSideMenuLayout();
  }

  public handleScroll(e) {
    const scrollTop = e.target.scrollTop;
    const fixed = scrollTop >= 100;

    if (fixed !== this.viewStoreService.pageHeaderFixed) {
      this.viewStoreService.setPageHeaderFixed(fixed);
      this.cdr.detectChanges();
    }
    this.viewStoreService.onMainScroll(scrollTop);
  }
}
