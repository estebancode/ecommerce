import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./feature/home/home.module').then(h => h.HomeModule)},
  {
    path: 'authentication',
    loadChildren: () => import('./feature/authentication/authentication.module').then(module => module.AuthenticationModule)
  },
  { path: '**', redirectTo: 'authentication' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
