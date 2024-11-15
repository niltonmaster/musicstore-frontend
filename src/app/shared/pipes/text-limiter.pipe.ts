import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimiter',
  standalone: true
})
export class TextLimiterPipe implements PipeTransform {

  transform(value: string, ...args: number[]): unknown {


    // return 'hola soy un pipe';



    // const limite = 30;

    const limite = args[0] || 10;//significa que si el valor args[0] es NULL| UNDEFINED

    if (value.length > limite) {
      return value.substring(0, limite) + '...';
    }

    return value;
  }

}
