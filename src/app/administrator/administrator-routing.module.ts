import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewiphoneComponent } from './addnewiphone/addnewiphone.component';
import { AddnewproductsComponent } from './addnewproducts/addnewproducts.component';
import { AddnewsamsungComponent } from './addnewsamsung/addnewsamsung.component';
import { AddnewxiaomiComponent } from './addnewxiaomi/addnewxiaomi.component';
import { AdministratorComponent } from './administrator.component';
import { ModifyproductsComponent } from './modifyproducts/modifyproducts.component';

const routes: Routes = [{ path: '', component: AdministratorComponent,children:[
  {path:'modifyproducts',component:ModifyproductsComponent},
  {path:'addnewproducts',component:AddnewproductsComponent,children:[
    {path:'addnewiphone',component:AddnewiphoneComponent},
    {path:'addnewsamsung',component:AddnewsamsungComponent},
    {path:'addnewxiaomi',component:AddnewxiaomiComponent},
    {path:'',redirectTo:'addnewiphone'}
  ]},
  {path:'',redirectTo:'modifyproducts',pathMatch:'full'},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
