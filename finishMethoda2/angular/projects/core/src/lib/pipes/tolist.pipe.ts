import { Pipe, PipeTransform } from '@angular/core';
import { status } from 'types';

@Pipe({
  name: 'tolist'
})
export class TolistPipe implements PipeTransform {

  transform(arr: status[], value:string): any {
    // let a=arr.filter(r=>r.name!=value)
    return arr
  }

}
