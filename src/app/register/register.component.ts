import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService }  from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private us:UserService) { }

  ngOnInit(): void {
  }
  onRegistration(userRegisterObj:any)
  {   
      // creating a formdata Object for image file
      let formData = new FormData();
      // add file
      formData.append('photo',this.file,this.file.name);
      // append user obj to it
      formData.append("userRegisterObj",JSON.stringify(userRegisterObj));
      // Creating a user at backend using user service...
      this.us.createUser(formData).subscribe(
        (res)=>{
          if(res.message ==='User created Successfully!!!')
          {
            alert('Registration successfull !!!');
            this.router.navigateByUrl('login');
          }
          else
          {
            alert(res.message);
          }
        },
        (err)=>{console.log("Error occured while registration...")}
        )
    }
    file!: File;
    selectFile(event:any)
    {
      this.file = event.target.files[0];
    }
}
