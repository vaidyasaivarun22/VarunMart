import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { DescriptionComponent } from './description/description.component';
import { HomeComponent } from './home/home.component';
import { IphonesComponent } from './iphones/iphones.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { SamsungComponent } from './samsung/samsung.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { XiaomiComponent } from './xiaomi/xiaomi.component';
const routes: Routes = [

  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'products',component:ProductsComponent,
  children:[
    {path:'iphones',component:IphonesComponent},
    {path:'iphones/:dscObj',component:DescriptionComponent},
    {path:'samsung',component:SamsungComponent},
    {path:'samsung/:dscObj',component:DescriptionComponent},
    {path:'xiaomi',component:XiaomiComponent},
    {path:'xiaomi/:dscObj',component:DescriptionComponent},
    {path:'',redirectTo:'/products/iphones',pathMatch:'full'},
          ]},
  {path:'admin',component:AdminComponent},
  {path:'userprofile',component:UserprofileComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},

  { path: 'administrator', loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule),canActivate:[AdminGuard]},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
