import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleLayoutComponent } from './component/layout/simple-layout/simple-layout.component';
import { FullLayoutComponent } from './component/layout/full-layout/full-layout.component';
import { LoginComponent } from './component/login/login.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PageAuthGuard } from './core-service/page-auth.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: 'login',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule),
        data: {
          title: 'Login'
        }
      }
    ]
  },
  {
    path: 'error',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./component/error-page/error-page.module').then(m => m.ErrorPageModule),
        data: {
          title: 'Error'
        }
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [PageAuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule { }
