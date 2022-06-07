import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  dataSource = new BehaviorSubject<any>(0);
  dataObservable = this.dataSource.asObservable();

  updateDataObservable(data:any)
  {
    this.dataSource.next(data);
  }



  // import http client 
  constructor(private hc:HttpClient) { }

  loginUser(userLoginObj:any):Observable<any>
  {
    return this.hc.post('users/login',userLoginObj);
  }
  getUser(username:any):Observable<any>
  {
    return this.hc.get(`users/getuser/${username}`);
  }
  createUser(userObj:any):Observable<any>
  {
    return this.hc.post('users/createuser',userObj);
  }
  updateUser(updatedUserObj:any):Observable<any>
  {
    return this.hc.put(`/users/updateuser/${updatedUserObj.username}`,updatedUserObj);
  }
  deleteUser(username:any):Observable<any>
  {
    return this.hc.delete(`/users/deleteuser/${username}`);
  }
  // ---------------------------------------------------------------------
  // cart Operations
  // 1.Add to Cart
  sendProductToUserCart(userProductObj:any):Observable<any>
  {
    return this.hc.post('/users/add-to-cart',userProductObj);
  }
  // 2.Get Cart products
  getProductsFromCart(username:any):Observable<any>
  {
    return this.hc.get(`/users/getproducts/${username}`);
  }
  // 3.Remove a specific product from cart upon pressing trash button
  removeProductsFromCart(usernameObj:any,productId:any):Observable<any>
  {
    return this.hc.put(`/users/deleteproduct/${productId}`,usernameObj);
  }
  // 4.Empty cart on Checkout
  emptyUserCartOnCheckout(username:any):Observable<any>
  {
    return this.hc.put(`/users/empty-cart/${username}`,username);
  }
}
