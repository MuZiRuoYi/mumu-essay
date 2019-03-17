import { Component, OnInit, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SiteConfig, PageMenu } from '../../interfaces';

@Component({
  selector: '[app-page-menu]',
  templateUrl: './page-menu.component.html',
  styleUrls: ['./page-menu.component.scss']
})
export class PageMenuComponent implements OnInit {
  @Input() private onChangeSideMenuLayout: Function;
  @Input() public siteConfig: SiteConfig;
  @Input() public menus: PageMenu[];

  public faTimes = faTimes;

  ngOnInit() {}

  public onSwitchSideMenuLayout() {
    this.onChangeSideMenuLayout();
  }
}
