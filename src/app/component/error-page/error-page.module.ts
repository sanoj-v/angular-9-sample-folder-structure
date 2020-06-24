import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Error401Component } from './401/401.component';
import { Error404Component } from './404/404.component';
const routes: Routes = [
  {
    path: '401',
    component: Error401Component,
    data: {
      title: '401 Unauthorised'
    }
  },
  {
    path: '404',
    component: Error404Component,
    data: {
      title: '404 Not Found'
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    Error401Component,
    Error404Component
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ErrorPageModule { }
