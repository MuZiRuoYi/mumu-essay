import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

import { ComponentsModule } from '../../components/components.module';

import { MainRoutingModule } from './main.routing.module';
import { MainComponent } from './main.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

@NgModule({
  imports: [BrowserModule, CommonModule, PerfectScrollbarModule, ComponentsModule, MainRoutingModule],
  declarations: [MainComponent],
  exports: [],
  providers: [{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }],
  bootstrap: [MainComponent]
})
export class MainModule {}
