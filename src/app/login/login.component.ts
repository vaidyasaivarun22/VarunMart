import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private us:UserService) { }

  ngOnInit(): void {
  }
onLogin(userLoginObj1:any){
  let userLoginObj = userLoginObj1.value;
  if(userLoginObj.username == 'admin' && userLoginObj.password == 'admin123')
  {
      alert("Admin Login has a seperate portal");
      this.router.navigateByUrl('/admin');
  }
  else
  {
    // alert("Seems to be a new User.Complete registration first!!!");
    // this.router.navigateByUrl('/register');
    this.us.loginUser(userLoginObj).subscribe(
      (res)=>{
        if(res.message === `Login successfull !!!`)
        {
          // storing user crediantials to local storage
          localStorage.setItem("username",res.username);
          localStorage.setItem("token",res.token);
          localStorage.setItem("userObj",JSON.stringify(res.userObj));

          alert(`Welcome ${userLoginObj.username}! We are glad to have to here :)`)
          this.router.navigateByUrl('products/iphones');
        }
        else
        {
          alert(res.message);
        }
      },
      (err)=>{console.log("Error occured while Logging in :(")}
    )
  }
}

}
