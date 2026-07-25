import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Hands-On 3, Task 3: attribute directive that highlights its host element on
 * hover. The highlight colour is configurable via the appHighlight input:
 *   <app-course-card appHighlight></app-course-card>            -> yellow (default)
 *   <app-course-card appHighlight="lightblue"></app-course-card> -> custom colour
 */
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  // configurable highlight colour (Hands-On 3, Task 3, step 37)
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight || 'yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
