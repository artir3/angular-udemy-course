import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filter: string, propName: string): any {
    if (value.lenght === 0) {
      return value;
    };

    let resultArray= [];
    for(let item of value) {
      if (item[propName].includes(filter)) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
