import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { mobile } from 'src/app/models/mobile.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-addnewiphone',
  templateUrl: './addnewiphone.component.html',
  styleUrls: ['./addnewiphone.component.css']
})
export class AddnewiphoneComponent implements OnInit {

  constructor(private dsObj:DataService,private router:Router,private as:AdminService) { }

  ngOnInit(): void {
  }
  mobileModel = new mobile('','','',0,0,'Apple iphone');
  onSubmitNewMobile()
  {
    if(this.mobileModel.productTitle != '' && this.mobileModel.productImage != '' && this.mobileModel.description != '' && this.mobileModel.price != 0)
    {
      this.as.addNewIphone(this.mobileModel).subscribe(
        res=>{
          if(res.message ==="New iphone added to collection")
          {
            alert("New Iphone Added To Collection Successfully!!!");
          }
          else
          {
            alert(res.message);
          }
        },
        err=>{
          alert("somethinng went wrong in adding product to collection...");
          console.log("error in rading data",err)  
          }
      )
    }
    //   this.dsObj.createNewIphoneData(this.mobileModel).subscribe(
    //     data=>{
    //       alert('New Iphone added to collection');
    //       // this.router.navigateByUrl('products/iphones');//Enable if u want to redirect after adding new
    //     },
    //     err=>{
    //       console.log("error in rading data",err);
    //     }
    //   )
    //   // console.log(this.mobileModel);
    // }
    else
    {
      alert("Some Fields are missing data. Ensure all fields are filled");
    }
  }

}
