import { Pipe, PipeTransform } from '@angular/core';
import { mobile } from './models/mobile.model';

@Pipe({
  name: 'searchXiaomi'
})
export class SearchXiaomiPipe implements PipeTransform {

  transform(xiaomi:mobile[], searchTerm:string): mobile[] {
    if(!xiaomi || !searchTerm)
    {
      return xiaomi;
    }
    else{
      return xiaomi.filter(prObj=>prObj.productTitle.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1);
    }
  }

}
