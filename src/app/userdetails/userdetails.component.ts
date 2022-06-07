import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakedataService } from '../fakedata.service';
// import { posts } from '../models/posts.model';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  postObj: any;
  constructor(private ar:ActivatedRoute,private fs:FakedataService) { }

  ngOnInit()
  {
      let id = this.ar.snapshot.params['id'];
      // get mobile details having id

      this.fs.getpostByID(id).subscribe(
          (data:any[])=>{
              this.postObj= data;
          },
          (err:any)=>{'error in reading posts is '+err}
      )
  }

}
