/**
 * Created by s.naik on 5/24/17.
 */
import {Component, Input} from '@angular/core';
@Component({
    selector: 'error-on-page',
    template: `
        <div class="error-contents-box" align="center">
            <div class="error-contents">
                <div> <i class="fa fa-exclamation-triangle red-text"></i> ERROR</div>
                <div>{{message}}</div>
            </div>
        </div>`,
    styles: [`
        div {
            text-align: center;
        }

        .error-contents-box {
            width: 100%;
           padding-top:20px;
        }

        .error-contents {
            display: table;
            margin: 0 auto;
            text-align: center;
            padding: 10px;
            max-width: 500px;
            width: 100%;
            background-color: #AAAAAA;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            color: #000;
        }

    `]
})
export class ErrorOnPageComponent {
    @Input() message: string;
}
