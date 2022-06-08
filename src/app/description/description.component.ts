import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../administrator/admin.service';
import { DataService } from '../data.service';
import { InsidecardService } from '../insidecard.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  postObj!:any;
  loginStatus:boolean = false;
  userObj:any;
  OverAllRating:number = 5;
  constructor(private ar:ActivatedRoute,private ic:InsidecardService,public dsObj:DataService,private router:Router,private asObj:AdminService,private usObj:UserService) {
  }
  
  ngOnInit(): void {

    this.userObj = localStorage.getItem("userObj");
    this.userObj = JSON.parse(this.userObj);

    let descObj = this.ar.snapshot.params[`dscObj`];
    const arr = descObj.split(" ");
    //get data of card which has id as above ..
    this.asObj.getCardDetails(arr[0],arr[1]).subscribe(
      (res:any)=>{
          this.postObj = res.message;
      },
      (err:any)=>{'error in reading data is:'+err.message}
    );
  }  
  checkLogin()
  {
    if(!this.dsObj.userLoginStatus())
    {
      let result=confirm('Please Login First to rate!!!');
      if(result)
      {
        this.router.navigateByUrl('login');
      }
    }
    if(this.dsObj.userLoginStatus() === true)
    {
      this.loginStatus = true;
    }
    else
    {
      this.loginStatus = false;
    }
  }
  countRating:number=254;
  ratingStatus:boolean=false;
  userRated(userRating:any)
  {
    let rating = userRating.value;
    if(rating.posted > 5 || rating.posted < 1)
    {
      alert("Rate only between 1 and 5");
    }
    else{
      if(rating.posted <= 4)
      {
        this.OverAllRating = 4;
      }
      else
      {
        this.OverAllRating = 4.2;
      }
      this.ratingStatus=true;
      this.loginStatus = false;
      this.countRating++;
      alert("Rating Submission Successfull !!!");
    // alert("Your rating would be posted after verifying by merchant to ensure genune purchase ratings :-)");
  }
  }
  openImg(imageObj:any)
  {
    window.location.href = `${imageObj}`;
  }
  
}
