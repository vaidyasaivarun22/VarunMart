import { Injectable } from '@angular/core';
import { product } from './models/product_id.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { mobile } from './models/mobile.model';

// Added an decorattor hence the below class acts as service
@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private hc:HttpClient) {
   }
  //Get Reguest-->Reading purpose
  // 1.For iphones
  getIphonesData():Observable<any[]>
  {
    // return this.hc.get<any[]>("http://localhost:3000/iphones");
    return this.hc.get<any[]>("assets/iphones.json");//For running without server enable this

  };
  // 2.for samsung
  getSamsungData():Observable<any[]>
  {
    // return this.hc.get<any[]>("http://localhost:3000/samsung");
    return this.hc.get<any[]>("assets/samsung.json");//For running without server enable this

  };
  // 3.For Xiaomi
  getXiaomiData():Observable<any[]>
  {
    // return this.hc.get<any[]>("http://localhost:3000/xiaomi");
    return this.hc.get<any[]>("assets/xiaomi.json");//For running without server enable this
  }


  // POST Request--->Create new Iphone
  // 1.For Iphones
  createNewIphoneData(mobileObj:any):Observable<any>
  {
    return this.hc.post("http://localhost:3000/iphones",mobileObj);
  }
  // 2.For Samsung
  createNewSamsungData(mobileObj:any):Observable<any>{
    return this.hc.post("http://localhost:3000/samsung",mobileObj);
  }
  // 3.For Xiaomi
  createNewXiaomiData(mobileObj:any):Observable<any>{
    return this.hc.post("http://localhost:3000/xiaomi",mobileObj);
  }



  //PUT Request---->Update Iphone Data
  // 1.For Iphones
  updateIphone(modifiedIphoneObj:any):Observable<[any]>
  {
    return this.hc.put<[any]>("http://localhost:3000/iphones/"+modifiedIphoneObj.id,modifiedIphoneObj);
  }
  // 2.For Samsung
  updateSamsung(modifiedSamsungObj:any):Observable<[any]>
  {
    console.log("\nData service id is:"+modifiedSamsungObj.id);
    return this.hc.put<[any]>("http://localhost:3000/samsung/"+modifiedSamsungObj.id,modifiedSamsungObj);
  }
  // 3.For Xiaomi
  updateXiaomi(modifiedXiaomiObj:any):Observable<[any]>
  {
    return this.hc.put<[any]>("http://localhost:3000/xiaomi/"+modifiedXiaomiObj.id,modifiedXiaomiObj);
  }

  // DELETE Request----> For deleting Iphone Data
  // 1.For Iphone
  deleteIphone(deleteIphoneObj:number)
  {
    return this.hc.delete<number>("http://localhost:3000/iphones/"+deleteIphoneObj);
  }
  // 2.For Samsung
  deleteSamsung(deleteSamsungObj:number)
  {
    console.log(deleteSamsungObj);
    return this.hc.delete<number>("http://localhost:3000/samsung/"+deleteSamsungObj);
  }
  // 3.For Xiaomi
  deleteXiaomi(deleteXiaomiObj:number)
  {
    return this.hc.delete<number>("http://localhost:3000/xiaomi/"+deleteXiaomiObj);
  }

  // ---------------------------------------------------
  // user login status
  userLoginStatus():boolean
  {
    if(localStorage.getItem("username")==null)
      return false;
    else
      return true;
  }
  //user & Admin Logout
  userLogout(){
    localStorage.clear();
  }

  // ------------------------------------------------------
  //Admin login status
  adminLoginStatus():boolean
  {
    if(localStorage.getItem("adminUsername")=="admin" && localStorage.getItem("adminPassword")=="admin123")
      return true;
    else
      return false;
  }

  getUserRating():number{
    return 0;
  }
}
