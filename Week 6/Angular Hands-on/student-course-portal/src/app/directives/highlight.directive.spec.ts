import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('div'));
    const directive = new HighlightDirective(el);
    expect(directive).toBeTruthy();
  });

  it('applies and removes the highlight colour on hover', () => {
    const host = document.createElement('div');
    const directive = new HighlightDirective(new ElementRef(host));
    directive.appHighlight = 'lightblue';
    directive.onMouseEnter();
    expect(host.style.backgroundColor).toBe('lightblue');
    directive.onMouseLeave();
    expect(host.style.backgroundColor).toBe('');
  });
});
