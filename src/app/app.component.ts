import {Component, OnInit} from '@angular/core';
import {candidatureService} from './candidature.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public students;

    constructor(private candiService:candidatureService) {

    }
    ngOnInit(): void {
    }




}


