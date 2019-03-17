import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHtmlPipe } from '../../pipes';
import { ArticleRoutingModule } from './article.routing.module';

import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [ArticleComponent, SafeHtmlPipe],
  imports: [CommonModule, ArticleRoutingModule]
})
export class ArticleModule {}
