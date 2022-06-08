import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  usercartObj:any;
  cartTotal:number=0;
  cartEmpty:boolean = true;
  userObj:any;
  userProfileStatus=true;
  count:number=0;

  constructor(private usObj:UserService,private router:Router) { }

  ngOnInit(): void {
    
    this.userObj = localStorage.getItem("userObj");
    this.userObj = JSON.parse(this.userObj);

    let username = localStorage.getItem("username");
    this.usObj.getProductsFromCart(username).subscribe(
      res=>{
        if(res.message === "Cart-Empty :(")
        {
          alert("User Cart Empty");
        }
        else
        {
          this.usercartObj = res.message;
          
            // console.log("hey it's me",this.usercartObj.products);
            for(var product of this.usercartObj.products)
            {
              let priceInString =  product.price;
              const arr = priceInString.split(",");
              const mystring = arr.join('');
              this.cartTotal = this.cartTotal + parseInt(mystring);
            }
        }
      },
      err=>{
        console.log("err in reading cart Products...");
        alert("Something went wrong while fetching products from cart :(");
      }
    )
    
  // get user cart objects from user Api
  this.usObj.getProductsFromCart(this.userObj.username).subscribe(
    res=>{
      if(res.message === "Cart-Empty :(")
      {
        this.usObj.updateDataObservable(0);
      }
      else{
        this.usObj.updateDataObservable(res.message);
      }
      this.usObj.dataObservable.subscribe(prodObj=>{
        if(prodObj == 0)
        {
          this.count = 0;
        }
        else
        {
          this.count = prodObj.products.length;
        }
      })
    },
    err=>{
      console.log("Error in syncing cart is ",err);
      alert("Some Error Occured !!!"+err.message);
    }
  )

  }
  removeFromCart(productObj:any)
  {
    // Logic for calculating price after removing an item from cart
    let priceInString =  productObj.price;
    const arr = priceInString.split(",");
    const mystring = arr.join('');
    this.cartTotal = this.cartTotal - parseInt(mystring);
    // console.log('remove',this.cartTotal);

    // Logic for database operation
    let username = localStorage.getItem("username");
    let usernameObj = {username};
    this.usObj.removeProductsFromCart(usernameObj,productObj._id).subscribe(
      res=>{
        if(res.message==="Product Removed successfully")
        {
          this.usObj.updateDataObservable(res.latestCartObject);
          // alert("Product Removed from cart Successfully");
          this.router.navigateByUrl('products');
        }      
        else{
          alert(res.message);
        }  
      },
      err=>{
        if(err.message.startsWith("Http failure during parsing"))
        {
          // alert("Product Removed from cart Successfully");
          this.router.navigateByUrl('products');
        }
        else
        {
          alert("Some Error occured please try again in a while.");
          console.log("Err in checkout ",err.message);
        }
      }
    )
  }
  checkout(username:any)
  {
    // this.cartTotal = this.cartTotal;
    this.usObj.emptyUserCartOnCheckout(username).subscribe(
      res=>{
        if(res.message == "checkout successfull !!!")
        {
          alert("Thanks for shopping at VarunMart. Purchase confirmation will be shortly noticed via your mail-id :)");
          alert("Have an Ossum Day... Visit Again !!!");
          this.router.navigateByUrl('products');
        }
        else
        {
          alert(res.message);
        }
      },
      err=>{
        if(err.message.startsWith("Http failure during parsing"))
        {
          alert("Thanks for shopping. Purchase confirmation will be shortly noticed via your Registered mail");
          alert("Have an Ossum Day...Visit Again !!!    - VarunMart");
          this.router.navigateByUrl('products');
        }
        else
        {
          alert("Some Error occured please try again in a while.");
          console.log("Err in checkout ",err.message);
        }
      }
    )
  }

  checkCartEmpty()
  {
    if(this.cartTotal === 0)
    {
      this.cartEmpty = true;
    }
    else
    {
      this.cartEmpty = false;
    }
  }

}
