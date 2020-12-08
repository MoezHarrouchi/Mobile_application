import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConfigurationResolverService } from './resolver/configuration-resolver.service'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'cours/:title',
    resolve: {
      special: ConfigurationResolverService
    },
    loadChildren: () => import('./cours/cours.module').then( m => m.CoursPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
