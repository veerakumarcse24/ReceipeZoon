import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: AppComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
