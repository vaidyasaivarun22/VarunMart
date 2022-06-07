import { Pipe, PipeTransform } from '@angular/core';
import { mobile } from './models/mobile.model';

@Pipe({
  name: 'searchSamsung'
})
export class SearchSamsungPipe implements PipeTransform {

  transform(samsung:mobile[], searchTerm:string): mobile[] {
    if(!samsung || !searchTerm)
    {
      return samsung;
    }
    else{
      return samsung.filter(prObj=>prObj.productTitle.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1);
    }
  }
}
