import { Component, OnInit } from '@angular/core';
import { AdminService } from '../administrator/admin.service';
import { DataService } from '../data.service';
import { product } from '../models/product_id.model';

@Component({
  selector: 'app-samsung',
  templateUrl: './samsung.component.html',
  styleUrls: ['./samsung.component.css']
})
export class SamsungComponent implements OnInit{
  searchTerm!:string;
  p=1;
  samsung:any[]=[];
  constructor(private dsObj:DataService,private as:AdminService){

  }
  ngOnInit(){
    this.as.getSamsung().subscribe(
      res=>{
        this.samsung = res.message;
      },
      err=>{
        alert("Error occured in reading samsung's data");
        console.log("err is",err);
      }
    )
  }
}
