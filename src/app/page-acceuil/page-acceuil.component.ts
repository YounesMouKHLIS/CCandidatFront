import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-acceuil',
  templateUrl: './page-acceuil.component.html',
  styleUrls: ['./page-acceuil.component.css']
})
export class PageAcceuilComponent implements OnInit {
  image: "C:\\Users\\Y.MOUKLIS\\IdeaProjects\\candidature\\uploads\\Students-photo.jpg"
  image2: "http://localhost:8080/images/Students-photo.jpg"

  constructor(private  router:Router) { }

  ngOnInit(): void {
    this.image2;
  }

  addMoroccanStudent() {
    this.router.navigateByUrl("/new-student");
  }

  addForeignStudent() {
    this.router.navigateByUrl("/new-FrStudent");
  }
}
