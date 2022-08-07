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
  count1star:number = 20;
  count2star:number = 6;
  count3star:number = 15;
  count4star:number = 63;
  count5star:number = 150; 
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
  userRated(userRating:any,prodObj:any,userObj:any)
  {

    let rating = userRating.value;
    if(rating.comment)
    {
      let username = localStorage.getItem("username");
      let commentObj = {username:username,comment:rating.comment,profileImage:userObj.profileImage};
      userRating.reset();
      this.asObj.postComment(commentObj,prodObj).subscribe(
        res=>{
          this.ngOnInit();
        },
        err=>{
          console.log('error in commenting is:'+err.message);
          this.ngOnInit();
        }
      )
    }
    else if(rating.posted > 5 || rating.posted < 1)
    {
      userRating.reset();
      alert("Rate only between 1 and 5");
    }
    else{
      userRating.reset();
      if(rating.posted === 4)
      {
        this.OverAllRating = 4;
        this.count4star++;
      }
      else if(rating.posted === 3)
      {
        this.OverAllRating = 4;
        this.count3star++;
      }
      else if(rating.posted === 2)
      {
        this.OverAllRating = 4;
        this.count2star++;
      }
      else if(rating.posted === 1)
      {
        this.OverAllRating = 4;
        this.count1star++;
      }
      else
      {
        this.OverAllRating = 4.2;
        this.count5star++;
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

  deleteMyComment(username:any,prodObj:any)
  {
    this.asObj.deleteComment(username,prodObj).subscribe(
      res=>{
        if(res.message === "comment deleted")
        {
          // alert("Comment Deleted successfully");
          // this.router.navigateByUrl('products');
          this.ngOnInit();
        }
      },
      err=>{
        console.log('error in deleting comment is:'+err.message);
        this.ngOnInit();

      }
    )
  }
  back()
  {
    history.back();
  }
  scrollTop()
  {
    window.scrollTo(0,0);
  }
}

