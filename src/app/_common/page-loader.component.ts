/**
 * Created by s.naik on 5/25/17.
 */
import {Component, Input} from '@angular/core';
@Component({
    selector: 'page-loader',
    template: `
        <div class="loader"></div>`,
    styles: [`
        div.loader:after {
            content: "";
            position: fixed;
            top: -500%;
            left: -500%;
            right: -500%;
            bottom: -500%;
            z-index: 9999;
            pointer-events: none; 
            background-color: rgba(0, 0, 0 ,0.6);
            background-image: url('../../images/loading.png');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100px 100px;

            /* animation */
            -webkit-animation-name: linearRotate;
            -webkit-animation-duration: 1s;
            -webkit-animation-iteration-count: infinite;
            -webkit-animation-timing-function: linear;

            -moz-animation-name: linearRotate;
            -moz-animation-duration: 1s;
            -moz-animation-iteration-count: infinite;
            -moz-animation-timing-function: linear;

            -o-animation-name: linearRotate;
            -o-animation-duration: 1s;
            -o-animation-iteration-count: infinite;
            -o-animation-timing-function: linear;

            animation-name: linearRotate;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;

        }

        @-webkit-keyframes linearRotate {
            from {
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                -o-transform:rotate(0deg);
                transform: rotate(0deg);
            }
            to {
                -webkit-transform: rotate(360deg);
                -moz-transform: rotate(360deg);
                -o-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
        Raw

    `]
})
export class PageLoaderComponent {
}
