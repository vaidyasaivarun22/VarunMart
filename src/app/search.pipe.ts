import { Pipe, PipeTransform } from '@angular/core';
import { mobile } from './models/mobile.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(iphones:mobile[], searchTerm:string): mobile[] {
    if(!iphones || !searchTerm)
    {
      return iphones;
    }
    else{
      return iphones.filter(prObj=>prObj.productTitle.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1);
    }
  }

}
