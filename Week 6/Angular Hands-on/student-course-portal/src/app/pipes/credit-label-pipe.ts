import { Pipe, PipeTransform } from '@angular/core';

/**
 * Hands-On 3, Task 3: transforms a credits number into a readable label.
 *   null / 0        -> 'No Credits'
 *   1               -> '1 Credit'
 *   2 or more       -> 'N Credits'
 */
@Pipe({
  name: 'creditLabel',
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value === 0) {
      return 'No Credits';
    }
    return value === 1 ? '1 Credit' : `${value} Credits`;
  }
}
