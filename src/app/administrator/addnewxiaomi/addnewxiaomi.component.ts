import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { mobile } from 'src/app/models/mobile.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-addnewxiaomi',
  templateUrl: './addnewxiaomi.component.html',
  styleUrls: ['./addnewxiaomi.component.css']
})
export class AddnewxiaomiComponent implements OnInit {

  constructor(private dsObj:DataService,private router:Router,private as:AdminService) { }

  ngOnInit(): void {
  }
  newObj:any = new mobile('','','',0,0,'xiaomi mobile');
  onSubmitNewXiaomi()
  {
    if(this.newObj.productTitle != '' && this.newObj.productImage != '' && this.newObj.description != '' && this.newObj.price != 0)
    {
      this.as.addNewXiaomi(this.newObj).subscribe(
        res=>{
          if(res.message ==="New xiaomi mobile added to collection")
          {
            alert("New Xiaomi Mobile Added To Collection Successfully!!!");
          }
          else
          {
            alert(res.message);
          }
        },
        err=>{
          alert("somethinng went wrong in adding product to collection...");
          console.log("error in posting data",err)  
          }
      )
    }
      // this.dsObj.createNewXiaomiData(this.newObj).subscribe(
      //   data=>{
      //     alert("New Xiaomi Mobile Added To Existing Collection");
      //     // this.router.navigateByUrl('products/xiaomi');//Enable to redirect after adding new mobile
      //   },
      //   err=>{console.log('Error in reading data',err)}
      // )
    else
    {
      alert("Some Fields are missing data. Ensure all fields are filled");
    }
  }

}
