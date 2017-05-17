/**
 * Created by s.naik on 5/5/2017.
 */

import {Directive, ElementRef, HostListener, Input} from '@angular/core';
@Directive({
    selector: '[customStyle]'
})
export class LogoDirective {
    @Input('customStyle') componentName: string;

    constructor(private el: ElementRef) {
            // this.bg('#FF0000');
            this.logo();
    }


    @HostListener('mouseenter') onMouseEnter() {

        // if (this.componentName === 'login') {
        //     this.bg(localStorage.getItem('color'));
        // } else {
        //     this.bg('#FCFCFC');
        //
        // }
    }

    // @HostListener('mouseleave') onMouseLeave() {
    //     this.highlight(null);
    // }

    private bg(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }

    private logo() {

        if (localStorage.getItem('logo')) {
            // this.el.nativeElement.style.background = 'url("'+ localStorage.getItem('logo') +'") no-repeat';
            this.el.nativeElement.style = localStorage.getItem('logo');
        }
    }
}
