import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGihghlightable]',
  standalone: true
})
export class GihghlightableDirective {

  constructor(public el: ElementRef) { }

  //cada vez que el mouse entre al 
  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.transform = "scale(1.05)";//significa aumenta 5%
    this.el.nativeElement.style.transition = "transform 300ms";//significa aumenta 5%
    this.el.nativeElement.style.boxShadow = "var(--primary-color) 0px 0px 10px";

  }


  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.transform = "scale(1)";//significa aumenta 5%
    this.el.nativeElement.style.boxShadow = "none";//significa aumenta 5%

  }


}
