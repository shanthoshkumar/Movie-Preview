import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PopularComponent } from '../popular/popular.component';
import { TrendingComponent } from '../trending/trending.component';

export const routes: Routes = [
  {
    path:'trending',
    component:TrendingComponent,
  },
  {
    path:'popular',
    component:PopularComponent,
  }, 
  {
    path:'',
    redirectTo:'trending',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forRoot(routes)
  ],
  declarations: []
})

export class AppRoutingModule { }
