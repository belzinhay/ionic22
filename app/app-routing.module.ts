import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./page/contato/contato.module').then(m => m.ContatoPageModule) 
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sobre',
    loadChildren: () => import('./page/sobre/sobre.module').then( m => m.SobrePageModule)
  },
  //Rota simples
  /*{path: 'inicio', component: iniciocomponent}*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
