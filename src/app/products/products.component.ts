import { Component, OnInit } from '@angular/core';
import { product } from '../models/product.model';
import {TestService} from '../test.service';
import {ProductDetailsComponent} from '../product-details/product-details.component'
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
 
  count!:number;
  constructor(public tsObj:TestService,private router:Router,public dsObj:DataService,private usObj:UserService){

  }
  ngOnInit(){

  // this.cartCount = this.obj.getData();
  let username = localStorage.getItem("username");
  // get user cart objects from user Api
  this.usObj.getProductsFromCart(username).subscribe(
  res=>{
    if(res.message === "Cart-Empty :(")
    {
      this.usObj.updateDataObservable(0);
    }
    else{
      this.usObj.updateDataObservable(res.message);
    }
    this.usObj.dataObservable.subscribe(
      prodObj=>{
      if(prodObj == 0)
      {
        this.count = 0;
      }
      else
      {
        this.count = prodObj.products.length;
      }
    },
    err=>{
      res.send(err.msg);
    })
  },
  err=>{
    console.log("Error in syncing cart is ",err);
    alert("Some Error Occured !!!"+err.message);
  }
  )
  }

  cartValue:number=0;
  cartUpdate()
  {
    if(this.dsObj.userLoginStatus())
    {
      this.cartValue = this.tsObj.getCartCount();
      this.router.navigateByUrl('userprofile');
    }
    else
    {
      this.router.navigateByUrl('login');
    }
  }
}

