import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { posts } from './models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class FakedataService {

  constructor(private hc:HttpClient) { }

  ngOnInit(){
  }
  getPosts():Observable<posts[]>
  {
    return this.hc.get<posts[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getpostByID(id:Observable<posts[]>){
    return this.hc.get<posts[]>('https://jsonplaceholder.typicode.com/posts/'+id);
  }

}
