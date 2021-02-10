import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GetContentCoursesResolverService } from './resolvers/getContentCourses-resolver.service';
import { SlidesComponent } from './components/slides/slides.component'
import { GetPlanningResolverService }from './resolvers/get-planning-resolver.service'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./components/header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./components/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'cours/:parent/:child/:id',
    resolve: {
      courses: GetContentCoursesResolverService
    },
    loadChildren: () => import('./pages/cours/cours.module').then(m => m.CoursPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./components/footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./components/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart-view/cart-view.module').then( m => m.CartViewPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path:'slide/:kursNr/:kursBezID/:action',
    component:SlidesComponent,
    /*resolve:{
      planning :GetPlanningResolverService
    }*/
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
