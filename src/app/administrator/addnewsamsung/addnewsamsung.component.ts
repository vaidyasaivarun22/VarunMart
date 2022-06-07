import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { mobile } from 'src/app/models/mobile.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-addnewsamsung',
  templateUrl: './addnewsamsung.component.html',
  styleUrls: ['./addnewsamsung.component.css']
})
export class AddnewsamsungComponent implements OnInit {

  constructor(private dsObj:DataService,private router:Router,private as:AdminService) { }
  newObj:any = new mobile('','','',0,0,'samsung mobile');
  ngOnInit(): void {
  }
  onSubmitNewSamsung()
  {
    if(this.newObj.productTitle != '' && this.newObj.productImage != '' && this.newObj.description != '' && this.newObj.price != 0)
    {
      this.as.addNewSamsung(this.newObj).subscribe(
        res=>{
          if(res.message ==="New samsung mobile added to collection")
          {
            alert("New Samsung Mobile Added To Collection Successfully!!!");
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
      // this.dsObj.createNewSamsungData(this.newObj).subscribe(
      // data=>{
      //   alert("New Samsung Mobile Added To Existing Collection");
      //   // this.router.navigateByUrl('products/samsung');//Enable to redirect after adding new mobile
      // },
      // err=>{'error in reading data'+err}
      // )
    else
    {
      alert("Some Fields are missing data. Ensure all fields are filled");
    }
  }

}
