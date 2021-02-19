import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength',
  pure: false
})
export class MaxLengthPipe implements PipeTransform {

  transform(text: string, length: number, evaluate: boolean = true): string {
    let newText: string = text;

    if (text !== undefined && text.length > length && length > 0 && evaluate) {
      newText = newText.substring(0, length);
      newText = newText[newText.length - 1] === ' ' ? newText.substring(0, newText.length - 1) : newText;
      newText += '...';
    }
    return newText;
  }

}