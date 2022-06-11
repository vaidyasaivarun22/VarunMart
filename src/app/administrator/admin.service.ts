import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }
  // Api-request for Iphones
  // 1.Adding a new iphone to the collection
  addNewIphone(newIphone:any):Observable<any>
  {
    return this.hc.post('/products/add-iphone',newIphone);
  }
  // 2.Getting all the collection from the database
  getIphone():Observable<any>
  {
    let x = this.hc.get('/products/get-iphones');
    return x;
  }
  // 3.Updating the existing Iphone data
  updateIphone(updatedIphone:any):Observable<any>
  {
    return this.hc.put('/products/update-iphone',updatedIphone);
  }
  // 4.Deleting an Iphone
  deleteIphone(iphoneToDeleteName:any):Observable<any>
  {
    return this.hc.delete(`/products/delete-iphone/${iphoneToDeleteName}`);
  }
  



  // Api-request for Samsung
  // 1.Adding a new samsung to the collection
  addNewSamsung(newSamsung:any):Observable<any>
  {
    return this.hc.post('/products/add-samsung',newSamsung);
  }
  // 2.Getting all the collection from the database
  getSamsung():Observable<any>
  {
    return this.hc.get('/products/get-samsung');
  }
  // 3.Updating the existing samsung mobile's data
  updateSamsung(updatedSamsung:any):Observable<any>
  {
    return this.hc.put('/products/update-samsung',updatedSamsung);
  }
  // 4.Deleting an Iphone
  deleteSamsung(samsungToDeleteObj:any):Observable<any>
  {
    return this.hc.delete(`/products/delete-samsung/${samsungToDeleteObj}`);
  }





  // Api-request for Xiaomi
  // 1.Adding a new xiaomi to the collection
  addNewXiaomi(newXiaomi:any):Observable<any>
  {
    return this.hc.post('/products/add-xiaomi',newXiaomi);
  }
  // 2.Getting all the collection from the database
  getXiaomi():Observable<any>
  {
    return this.hc.get('/products/get-xiaomi');
  }
  // 3.Updating the existing xiaomi mobile data
  updateXiaomi(updatedXiaomi:any):Observable<any>
  {
    return this.hc.put('/products/update-xiaomi',updatedXiaomi);
  }
  // 4.Deleting an Xiaomi mobile
  deleteXiaomi(xiaomiToDeleteObj:any):Observable<any>
  {
    return this.hc.delete(`/products/delete-xiaomi/${xiaomiToDeleteObj}`);
  }


  getCardDetails(productName:any,id:any):Observable<any>
  {
    if(productName === "AppleIphone")
    {
      return this.hc.get(`/products/get-iphone/${id}`);
    }
    else if(productName == "samsungMobile")
    {
      return this.hc.get(`/products/get-samsung/${id}`);
    }
    else
    {
      return this.hc.get(`/products/get-xiaomi/${id}`);
    }
  }

  // Add a comment to a specific mobilehaving id
  postComment(commentObj:any,prodObj:any):Observable<any>
  {
    let prod_id = prodObj._id;
    if(prodObj.product === "Apple iphone")
    {
      return this.hc.put(`/products/addComment-iphone/${prod_id}`,commentObj);
    }
    else if(prodObj.product === "samsung mobile")
    {
      return this.hc.put(`/products/addComment-samsung/${prod_id}`,commentObj);
    }
    else
    {
      return this.hc.put(`/products/addComment-xiaomi/${prod_id}`,commentObj);
    }
  }
  // delete a comment of a specific user for a specific mobile
  deleteComment(username:any,prodObj:any):Observable<any>
  {
    let prod_id = prodObj._id;
    let usernameObj = {username:username}
    if(prodObj.product === "Apple iphone")
    {
      return this.hc.put(`/products/deleteComment-iphone/${prod_id}`,usernameObj);
    }
    else if(prodObj.product === "samsung mobile")
    {
      return this.hc.put(`/products/deleteComment-samsung/${prod_id}`,usernameObj);
    }
    else
    {
      return this.hc.put(`/products/deleteComment-xiaomi/${prod_id}`,usernameObj);
    }
  }
}
