import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from './administrator.component';
import { ModifyproductsComponent } from './modifyproducts/modifyproducts.component';
import { AddnewiphoneComponent } from './addnewiphone/addnewiphone.component';
import { AddnewsamsungComponent } from './addnewsamsung/addnewsamsung.component';
import { AddnewxiaomiComponent } from './addnewxiaomi/addnewxiaomi.component';
import { AddnewproductsComponent } from './addnewproducts/addnewproducts.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdministratorComponent,
    ModifyproductsComponent,
    AddnewiphoneComponent,
    AddnewsamsungComponent,
    AddnewxiaomiComponent,
    AddnewproductsComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdministratorModule { }
