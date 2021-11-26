import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewStudentComponent} from './new-student/new-student.component';
import {CandidatureComponent} from './candidature/candidature.component';
import {StudentsComponent} from './students/students.component';
import {ShowCandidatureComponent} from './show-candidature/show-candidature.component';
import {NewFrStudentComponent} from './new-fr-student/new-fr-student.component';
import {PageAcceuilComponent} from './page-acceuil/page-acceuil.component';

const routes: Routes = [
  {
    path:"new-student", component :NewStudentComponent
  },
  {
    path:"candidature/:id", component :CandidatureComponent
  },
  {
    path:"students", component :StudentsComponent
  },
  {
    path:"show-candidature/:id", component :ShowCandidatureComponent
  },
  {
    path:"new-FrStudent", component :NewFrStudentComponent
  },
  {
    path:"page-acceuil", component :PageAcceuilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
