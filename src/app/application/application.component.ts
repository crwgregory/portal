/**
 * Created by s.naik on 5/9/17.
 */
import {Component, ViewChild} from '@angular/core';
import {QuestionsComponent} from './questions.component';
import {Router} from '@angular/router';
@Component({
    selector: 'application-form',
    templateUrl: 'application.component.html'
})

export class ApplicationComponent {
    // @ViewChild(QuestionsComponent) questions: QuestionsComponent
    constructor(private router: Router) {
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
    }
}
