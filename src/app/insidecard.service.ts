import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from './models/product_id.model';

@Injectable({
  providedIn: 'root'
})

export class InsidecardService {

  constructor(private hc:HttpClient) { }

  getCardDetails(id:number):Observable<product>{
    if(id<=100)
        return this.hc.get<product>("http://localhost:3000/iphones/"+id);
    else if(id<=200)
        return this.hc.get<product>("http://localhost:3000/samsung/"+id);
    else 
        return this.hc.get<product>("http://localhost:3000/xiaomi/"+id); 
  }
}
