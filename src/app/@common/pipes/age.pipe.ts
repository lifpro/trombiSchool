import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  public age: number;
  transform(value: any, args?: any): unknown {
    if (!value) return value;
    var timeDiff = Math.abs(Date.now() - new Date(value).getTime());
    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return this.age;
  }

}
