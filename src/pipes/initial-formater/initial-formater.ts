import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initial',
})
export class InitialFormaterPipe implements PipeTransform {
transform(value: string, ...args) {
    return value.charAt(0).toUpperCase();
  }
}
