/**
 * Created by s.naik on 5/25/17.
 */

import {Directive, ElementRef, HostListener, Input} from '@angular/core';
@Directive({
    selector: '[customStyle]'
})
export class CustomTemplateDirective {
    @Input('customStyle') customStyle: string;

template: any;
componentName : string;
    constructor(private el: ElementRef) {
        console.log('componentName = ' + this.el.nativeElement.id);
        this.componentName = this.el.nativeElement.getAttribute('data-style-key');
        this.updateCSS();

    }

    // @HostListener('mouseleave') onMouseLeave() {
    //     console.log('componentName = '+ this.customStyle );
    //
    // }
    updateCSS() {
        console.log('show componentName = ' + this.componentName);
        if (localStorage.getItem('template')) {
            this.template = JSON.parse(localStorage.getItem('template'));
            console.log(this.componentName + ' - template= ' + JSON.stringify(this.template[this.componentName]));

            if (this.template[this.componentName]) {

                switch (this.componentName) {
                    case 'logo':
                        this.updateLogo();
                        break;
                    default:
                        this.updateStyle();
                }
            }
        }

    }

    private updateStyle() {
        this.el.nativeElement.style = this.template[this.componentName];
    }

    private updateLogo() {
        this.el.nativeElement.style.background = 'url("' + this.template[this.componentName] + '") no-repeat';
    }
}
