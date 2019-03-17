import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainModule } from './app/pages/main/main.module';

declare var ENV: string;

if (ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(MainModule)
  .catch(err => console.error(err));
