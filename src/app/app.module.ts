import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NewStudentComponent} from './new-student/new-student.component';
import {FormsModule,} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {CandidatureComponent} from './candidature/candidature.component';
import {StudentsComponent} from './students/students.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {ShowCandidatureComponent} from './show-candidature/show-candidature.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {NewFrStudentComponent} from './new-fr-student/new-fr-student.component';
import {PageAcceuilComponent} from './page-acceuil/page-acceuil.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    NewStudentComponent,
    CandidatureComponent,
    StudentsComponent,
    ShowCandidatureComponent,
    NewFrStudentComponent,
    PageAcceuilComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
