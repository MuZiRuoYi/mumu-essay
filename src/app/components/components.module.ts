import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PageMenuComponent } from './page-menu/page-menu.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';
import { PaginationComponent } from './pagination/pagination.component';

const components: any[] = [
  PageMenuComponent,
  PageHeaderComponent,
  PageFooterComponent,
  ArticleOverviewComponent,
  PaginationComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  declarations: components,
  exports: components
})
export class ComponentsModule {}
