import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { IphonesComponent } from './iphones/iphones.component';
import { SamsungComponent } from './samsung/samsung.component';
import { XiaomiComponent } from './xiaomi/xiaomi.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminComponent } from './admin/admin.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { DescriptionComponent } from './description/description.component';
import { FormsModule } from '@angular/forms';
import { SearchSamsungPipe } from './search-samsung.pipe';
import { SearchXiaomiPipe } from './search-xiaomi.pipe'; 
import { SharedModule } from './shared/shared.module';
import { UserprofileComponent } from './userprofile/userprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    FooterComponent,
    ProductDetailsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    IphonesComponent,
    SamsungComponent,
    XiaomiComponent,
    PagenotfoundComponent,
    AdminComponent,
    UserdetailsComponent,
    DescriptionComponent,
    SearchSamsungPipe,
    SearchXiaomiPipe,
    UserprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
