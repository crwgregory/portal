/**
 * Created by s.naik on 5/4/2017.
 */
import {Directive, ElementRef, HostListener, Input} from '@angular/core';
@Directive({
    selector: '[appBackground]'
})
export class BackgroundDirective {
    @Input('appBackground') componentName: string;

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
