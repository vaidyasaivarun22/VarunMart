import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { mobile } from 'src/app/models/mobile.model';
import { SearchPipe } from 'src/app/search.pipe';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-modifyproducts',
  templateUrl: './modifyproducts.component.html',
  styleUrls: ['./modifyproducts.component.css']
})
export class ModifyproductsComponent implements OnInit {
  iphones: any[]=[];
  samsung: any[]=[];
  xiaomi: any[]=[];

  searchTerm!: string;

  //Index to hold current Iphone object that is to be updated
  editIphoneIndex: any;
  editIphoneObj = new mobile('','','',0,0,'Apple iphone');
  editIphoneStatus:boolean = false;

  //Index to hold current Samsung object that is to be updated
  editSamsungIndex: any;
  editSamsungObj = new mobile('','','',0,0,'samsung mobile');
  editSamsungStatus:boolean = false;

  //Index to hold current xiaomi object that is to be updated
  editXiaomiIndex: any;
  editXiaomiObj = new mobile('','','',0,0,'xiaomi mobile');
  editXiaomiStatus:boolean = false;

  constructor(private dsObj:DataService,private as:AdminService) { }

  ngOnInit(){
    this.getUsers();
  }
  getUsers()
  {
    this.as.getIphone().subscribe(
      res=>{
        this.iphones = res.message;
      },
      err=>{
        alert("Error occured in reading iphone's data");
        console.log("err is",err);
      }
    )
    this.as.getSamsung().subscribe(
      res=>{
        this.samsung = res.message;
      },
      err=>{
        alert("Error occured in reading samsung's data");
        console.log("err is",err);
      }
    )
    this.as.getXiaomi().subscribe(
      res=>{
        this.xiaomi = res.message;
        // console.log(this.xiaomi);
      },
      err=>{
        alert("Error occured in reading xiaomi's data");
        console.log("err is",err);
      }
    )
  }
  // -----------------------------------------------------------------------------------
  //To edit Iphone data
  editIphone(iphoneObj:any,ind:number){
      this.editIphoneObj = iphoneObj;
      this.editIphoneIndex = ind;
      this.editIphoneStatus = true;
      // console.log(ind+'  '+iphoneObj.id);
  }
  // After saving Iphone Data
  onSaveIphone(iphoneObj:any){ 
    iphoneObj.product = 'Apple iphone';
    this.editIphoneStatus = false;
    this.as.updateIphone(iphoneObj).subscribe(
      res=>{
        if(res.message === "Iphone Updated Successfully!!!")
        {
          alert(`${iphoneObj.productTitle} updated successfully !!!`);
        }
        else
        {
          console.log("err is ",res.message);
        }
      },
      err=>{
        console.log('err is',err.message);
        alert("Something went wrong :( ");
      }
    )
  }
  // After Delete Button selected of Iphone
  onDeleteIphone(iphoneObj:any)
  {
      this.as.deleteIphone(iphoneObj.productTitle).subscribe(
        res=>{
          if(res.message === "deleted iphone successfully")
          {
            alert("Successfully Deleted Iphone - "+iphoneObj.productTitle);
          }
          else
          {
            alert("something went wrong!!!");
            console.log("err to delete is ",res.message);
          }
        },
        err=>{console.log("Error in deleting data",err.message)}
      )
  }
// -------------------------------------------------------------------------------------------//
  //To edit Samsung data
  editSamsung(samsungObj:any,ind:number){
    this.editSamsungObj = samsungObj;
    this.editSamsungIndex = ind;
    this.editSamsungStatus = true;
  }
  // After saving Samsung Data
  onSaveSamsung(samsungObj:any){  

    this.editSamsungStatus = false;
    samsungObj.description = this.editSamsungObj.description;
    samsungObj.productTitle = this.editSamsungObj.productTitle;
    samsungObj.productImage = this.editSamsungObj.productImage;
    samsungObj.price = this.editSamsungObj.price;
    samsungObj.available = this.editSamsungObj.available;
    samsungObj.product = "samsung mobile";

    this.as.updateSamsung(samsungObj).subscribe(
      res=>{
        if(res.message === "Samsung mobile Updated Successfully!!!")
        {
          alert(`${samsungObj.productTitle} updated successfully !!!`);
        }
        else
        {
          console.log("err is ",res.message);
        }
      },
      err=>{
        console.log('err is',err.message);
        alert("Something went wrong :( ");
      }
    )
}
  // After Delete Button selected of Samsung
  onDeleteSamsung(samsungObj:any)
  {
      this.as.deleteSamsung(samsungObj.productTitle).subscribe(
        res=>{
          if(res.message === "deleted samsung successfully")
          {
            alert("Successfully Deleted - "+samsungObj.productTitle);
          }
          else
          {
            alert("something went wrong!!!");
            console.log("err to delete is ",res.message);
          }
        },
        err=>{console.log("Error in deleting data",err.message)}
      )
  }
  // ------------------------------------------------------------------------------------//
   //To edit Xiaomi data
   editXiaomi(xiaomiObj:any,ind:number){
    this.editXiaomiObj = xiaomiObj;
    this.editXiaomiIndex = ind;
    this.editXiaomiStatus = true;
  }
  // After saving Xiaomi Data
  onSaveXiaomi(xiaomiObj:any){ 
    this.editXiaomiStatus = false;
    xiaomiObj.description = this.editXiaomiObj.description;
    xiaomiObj.productTitle = this.editXiaomiObj.productTitle;
    xiaomiObj.productImage = this.editXiaomiObj.productImage;
    xiaomiObj.price = this.editXiaomiObj.price;
    xiaomiObj.available = this.editXiaomiObj.available;
    xiaomiObj.product = "xiaomi mobile";

    this.as.updateXiaomi(xiaomiObj).subscribe(
      res=>{
        if(res.message === "Xiaomi mobile Updated Successfully!!!")
        {
          alert(`${xiaomiObj.productTitle} updated successfully !!!`);
        }
        else
        {
          console.log("err is ",res.message);
        }
      },
      err=>{
        console.log('err is',err.message);
        alert("Something went wrong :( ");
      }
    )
}
  // After Delete Button selected of Iphone
  onDeleteXiaomi(xiaomiObj:any)
  {
      this.as.deleteXiaomi(xiaomiObj.productTitle).subscribe(
        res=>{
          if(res.message === "deleted xiaomi successfully")
          {
            alert("Successfully Deleted - "+xiaomiObj.productTitle);
          }
          else
          {
            alert("something went wrong!!!");
            console.log("err to delete is ",res.message);
          }
        },
        err=>{console.log("Error in deleting data",err.message)}
      )
  }
}
