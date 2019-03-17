import marked from 'marked';
import moment from 'moment';
import * as stripTags from 'striptags';
import hfm from 'hexo-front-matter';
import { SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';

import files from './articles';
import { Article, ArticleHeader } from '../../app/interfaces';

export const articles: Article[] = files
  .map((file, index) => {
    const fileContent = String(file.file);
    const attrs = hfm(fileContent.split('\r\n').join('\n')); // CRLF to LF
    const html = marked(attrs._content);
    const content = stripTags(html).slice(0, 250) + '...';
    const time = moment(attrs.date).format('YYYY-MM-DD HH:mm:ss');
    const tags = attrs.tags ? (Array.isArray(attrs.tags) ? attrs.tags : [attrs.tags]) : [];
    const path = `${file.path}`;

    return { time, title: attrs.title, content, _content: attrs._content, tags, path };
  })
  .sort((file1, file2) => (moment(file1.time).isBefore(file2.time) ? 1 : -1));

export function getArticlePage(article: Article) {
  const renderer = new marked.Renderer();
  const headers: ArticleHeader[] = [];
  let html: SafeHtml;

  renderer.heading = function(text, level, rawText) {
    headers.push({ text, level, number: '' });
    return `<h${level} id="${decodeURIComponent(text)}">${text}</h${level}>`;
  };
  renderer.code = function(code, language) {
    return `<pre class="${language ? 'hljs-' + language : ''}">${
      language ? hljs.highlightAuto(code, [language]).value : code
    }</pre>`;
  };

  marked.setOptions({ headerPrefix: 'mu-md-header', renderer });

  html = marked(article._content);

  const hs = new Array(6).fill(0);
  let last;

  headers.forEach(h => {
    if (last && h.level < last.level) {
      hs[last.level - 1] = 0;
    }
    hs[h.level - 1] += 1;
    h.number = hs.filter(i => i > 0).join('.');
    last = h;
  });

  return { headers, html };
}

export default articles;
