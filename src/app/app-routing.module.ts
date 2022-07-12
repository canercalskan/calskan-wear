import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/404/404.component';
import { HomeComponent } from './components/pages/home/home.component';
const routes: Routes = [
  {path:'Home' , component: HomeComponent},
  {path : '' , component : HomeComponent},
  {path: '**' , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
