import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HunterComponent} from './hunter/hunter.component';
import {ProjectsComponent} from './projects/projects.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'hunter', component: HunterComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
