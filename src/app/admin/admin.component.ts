import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  constructor(private router:Router,public dsObj:DataService) { }

  ngOnInit(): void {
  }
  onLogin(userobj:any)
  {
      let userLoginObj = userobj.value;
      if(userLoginObj.username == 'admin' && userLoginObj.password == 'admin123')
      {
          localStorage.setItem("adminUsername","admin");
          localStorage.setItem("adminPassword","admin123");
          this.router.navigateByUrl('/administrator');
      }
      else
      {
          alert("Inavlid credentials!!!");
      }
  }
}
