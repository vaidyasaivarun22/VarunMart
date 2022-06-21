import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
// import { product } from '../models/product_id.model';
import {TestService} from '../test.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  count:number=0;
  count2:number=0;
  change:number=1;
  available:boolean = true;
  noMoreAdd:boolean = false;
  noMoreRemove:boolean = true;
  constructor(private tsObj:TestService,private router:Router,public dsObj:DataService,private usObj:UserService){
      // this.tsObj.setData(this.count);
    }
    @Input()
    productobj!: any;

    sendProductToParent(prObj:any)
    {
      if(this.count < 5)
      {
        this.count++;
      }
      if(this.count < 5)
      {
        this.noMoreAdd = false;
        this.noMoreRemove = false;
      }
      else{
        this.noMoreAdd = true;
        this.noMoreRemove = false;
      }
    }
    removeFromCart()
    {
      if(this.count > 0)
      {
        this.count--;
      }
      if(this.count > 0)
      {
        this.noMoreAdd = false;
        this.noMoreRemove = false;
      }
      else
      {
        this.noMoreRemove = true;
        this.noMoreAdd = false;
      }
    }
    ngOnInit(){
    this.tsObj.setData(this.count2);
  }
  onSelectId(dscObj:any)
  {
      if(dscObj.product.startsWith("Apple"))
      {
        let sc = "AppleIphone"+" "+dscObj._id;
        this.router.navigateByUrl('products/iphones/'+sc);
      }
      else if(dscObj.product.startsWith("samsung"))
      {
        let sc = "samsungMobile"+" "+dscObj._id;
        this.router.navigateByUrl('products/samsung/'+sc);
      }
      else
      {
        let sc = "xiaomiMobile"+" "+dscObj._id;
        this.router.navigateByUrl('products/xiaomi/'+sc);
      }
  }
  checkLoginStatus()
  {
    if(!this.dsObj.userLoginStatus())
    {
        let result=confirm('Login to make purchases!!!');
        if(result)
        {
          this.router.navigateByUrl('login');
        }
        else
        {
          this.count--;
          this.noMoreRemove = true;
        }
    }
  }
  x:number=0;
  onAdd()
  {
    this.tsObj.setCartCount(this.x++);
  }

  // product selected by user
  onProductSelect(productObj:any)
  {
    var audio = new Audio("../../assets/inToCartSound.wav");
    audio.play();
    if(this.dsObj.userLoginStatus())
    {
      // console.log('1',productObj);
      let username = localStorage.getItem("username");
      let newUserProductObj = {username,productObj};

      this.usObj.sendProductToUserCart(newUserProductObj).subscribe(
        res=>{
          if(res.message !== "New product Added")
          {
            alert(res.message);
          }
          this.usObj.updateDataObservable(res.latestCartObject);
        },
        err=>{
          console.log("Err in posting product to cart",err.message);
          // alert("Product Added To Cart Successfully !!!");
        }
      )
    }
  }

  redirectToModifyProduct()
  {
    this.router.navigateByUrl('administrator/modifyproducts');
  }

  removeProductFromCart(productObj:any)
  {
    var audio = new Audio("../../assets/outOfCartSound.wav");
    audio.play();
    let username = localStorage.getItem("username");
    this.usObj.removeProductsFromCart(username,productObj).subscribe(
      res=>{
        if(res.message==="Product Removed successfully")
        {
          // alert("Product Removed from cart Successfully");
          this.usObj.updateDataObservable(res.latestCartObject);
        }      
        else{
          alert(res.message);
        }  
      },
      err=>{
        if(err.message.startsWith("Http failure during parsing"))
        {
          // alert("Product Removed from cart Successfully");
        }
        else
        {
          alert("Some Error occured please try again in a while.");
          console.log("Err in checkout ",err.message);
        }
      }
    )
  }
}


