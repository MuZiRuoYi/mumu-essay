import { Component, OnInit, Input } from '@angular/core';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[app-page-header]',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() private onChangeSideMenuLayout: Function;
  @Input() public fixed: Boolean;
  @Input() public sideMenuVisible: Boolean;
  @Input() public pageTitle: String;

  public searchInput: Boolean;
  public faBars = faBars;
  public faSearch = faSearch;

  ngOnInit() {}

  onSwitchSearch() {
    this.searchInput = !this.searchInput;
  }

  public onSwitchSideMenuLayout() {
    this.onChangeSideMenuLayout();
  }
}
