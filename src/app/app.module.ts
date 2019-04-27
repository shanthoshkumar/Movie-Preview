import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopularComponent } from './popular/popular.component';
import { HttpClientModule } from '@angular/common/http';
import { TrendingComponent } from './trending/trending.component';
import { AppRoutingModule, routes } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { PagerService } from '../_services/index';
@NgModule({
  declarations: [
    AppComponent,
    PopularComponent,
    TrendingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes) 
     ],
  providers: [PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
