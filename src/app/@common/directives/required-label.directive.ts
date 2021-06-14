import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRequiredLabel]'
})
export class RequiredLabelDirective {

  constructor(public e: ElementRef, r: Renderer2) {
    r.setStyle(e.nativeElement, 'color', '#ff0000');
    r.setStyle(e.nativeElement, 'font-size', '30px');
    r.setStyle(e.nativeElement, 'text-decoration', 'underline')
  }

}
