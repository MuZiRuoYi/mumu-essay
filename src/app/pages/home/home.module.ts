import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, ComponentsModule, RouterModule, HomeRoutingModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
