import { Component, OnInit } from '@angular/core';
import { AdminService } from '../administrator/admin.service';
import { DataService } from '../data.service';
import { product } from '../models/product_id.model';

@Component({
  selector: 'app-xiaomi',
  templateUrl: './xiaomi.component.html',
  styleUrls: ['./xiaomi.component.css']
})
export class XiaomiComponent implements OnInit{
  searchTerm!:string;
  p=1;

  xiaomi:any[]=[];
  constructor(private dsObj:DataService,private as:AdminService){

  }
  ngOnInit(){
    this.as.getXiaomi().subscribe(
      res=>{
        this.xiaomi = res.message;
      },
      err=>{
        alert("Error occured in reading xiaomi's data");
        console.log("err is",err);
      }
    )
  }

}
