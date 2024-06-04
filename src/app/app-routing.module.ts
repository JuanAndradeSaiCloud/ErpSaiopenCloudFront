import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Login/sign-in/sign-in.component';
import { LayoutComponent } from './Layout/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
 
  { path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},
  { path: 'login', component: SignInComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [/*{
      path: 'customers', loadChildren: () => import('src/app/tenant/customer/customers.routes'),
      resolve: {
          thirdPartyIdentification: IdentificationResolverService,
          geographics:geographicsResolver,
       }
    }*/
  ]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
export const routingComponents = [];
