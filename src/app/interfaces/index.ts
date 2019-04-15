import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Article {
  title: string;
  content: string;
  tags?: String[];
  time: String;
  path?: string;
  _content: String;
}

export interface ArticleHeader {
  text: String;
  level?: number;
  number?: string;
  top?: number;
}

export interface PageMenu {
  name: String;
  href?: String;
  icon: IconDefinition;
}

export interface SiteConfig {
  siteTitle: String;
  subSiteTitle: String;
  author: String;
  email: String;
  description: String;
  copyright: String;
  tagColors?: String[];
  pageSize?: number;
}
