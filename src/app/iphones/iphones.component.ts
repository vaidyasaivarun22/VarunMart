import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// import { product } from '../models/product_id.model';
import { AdminService } from '../administrator/admin.service';

@Component({
  selector: 'app-iphones',
  templateUrl: './iphones.component.html',
  styleUrls: ['./iphones.component.css']
})
export class IphonesComponent implements OnInit{
  iphones:any[]=[];
  searchTerm!: string;
  p=1;
  constructor(private dsObj:DataService,private as:AdminService){

  }
  ngOnInit(){
    this.as.getIphone().subscribe(
      res=>{
        this.iphones = res.message;
      },
      err=>{
        alert("Error occured in reading iphone's data");
        console.log("err is",err);
      }
    )
  }

}
