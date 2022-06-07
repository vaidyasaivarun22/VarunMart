import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  data:any;
  getData()
  {
      return this.data;
  }
  setData(value:number)
  {
      this.data = value;
  }
  cartCount:number=0;
  setCartCount(value:number)
  {
      this.cartCount = value;
  }
  getCartCount()
  {
      console.log(this.cartCount);
      return this.cartCount;
  }
}
