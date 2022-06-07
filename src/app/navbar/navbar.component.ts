import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dsObj:DataService){ }

  ngOnInit(): void {
  }
  textSearch(queryObj:any)
  {
    let query = queryObj.value;
    window.location.href = `https://google.com/search?q=${query.search}`;
  }
}
