/**
 * Created by s.naik on 5/5/2017.
 */

import {Directive, ElementRef, HostListener, Input} from '@angular/core';
@Directive({
    selector: '[customStyle]'
})
export class CustomDirective {
    @Input('customStyle') componentName: string;

    constructor(private el: ElementRef) {
    }


    @HostListener('mouseenter') onMouseEnter() {
        if (this.componentName === 'login') {
            this.bg(localStorage.getItem('color'));
        } else {
            this.bg('#FCFCFC');

        }
    }

    // @HostListener('mouseleave') onMouseLeave() {
    //     this.highlight(null);
    // }
    private bg(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}
