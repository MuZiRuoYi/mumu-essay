import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-page-footer]',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {
  @Input() public copyright: String;

  ngOnInit() {}
}
