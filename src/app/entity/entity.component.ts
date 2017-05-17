import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        console.log(router.url);
        console.log(activatedRoute.snapshot.url[0].path);
        localStorage.removeItem('logo');
        // localStorage.setItem('location', activatedRoute.snapshot.url[0].path);
        // localStorage.setItem('logo', 'background-image: url("/images/logo/panda.jpeg"); width:278px; height:181px;');

    }

    ngOnInit() {
        this.router.navigate(['login']);
    }

}
