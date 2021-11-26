import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {candidatureService} from '../candidature.service';
import {Router} from '@angular/router';
import {Student} from '../model/student.model';

@Component({
  selector: 'app-new-fr-student',
  templateUrl: './new-fr-student.component.html',
  styleUrls: ['./new-fr-student.component.css']
})
export class NewFrStudentComponent implements OnInit {
  userFile : File;
  reactiveForm: FormGroup;
  currentStudent: Student;
  imagePath;
  imgUrl;

  constructor(private fb: FormBuilder, private candiService:candidatureService, private  router:Router) {
    this.reactiveForm = this.fb.group({
      firstName : new FormControl('',[Validators.required,Validators.compose([Validators.pattern('[a-zA-z]*'),Validators.minLength(3)])]),
      lastName : new FormControl('',[Validators.required,Validators.compose([Validators.pattern('[a-zA-z]*'),Validators.minLength(2)])]),
      email : new FormControl('',[Validators.required,Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]),
      phoneNumber : new FormControl('',[Validators.required,Validators.compose([Validators.pattern('[0-9+]*'),Validators.minLength(10),Validators.maxLength(14)])]),
      age: new FormControl(),
      country: new FormControl(),
      codeNational: new FormControl(),
      codePassport: new FormControl(),

    })
  }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.userFile = file;
    console.log(file);

    var reader = new FileReader();
    this.imagePath= file;
    reader.readAsDataURL(file);
    reader.onload = (event) =>{
      this.imgUrl = reader.result;
    }

  }

  saveFrom(submitForm: FormGroup) {
    if (submitForm.valid){
      const user = submitForm.value;
      const formData = new FormData();
      formData.append('user',JSON.stringify(user));
      formData.append('file',this.userFile);
      this.candiService.SaveForeignStdProfile(formData).subscribe((res) =>{
        this.currentStudent=res;
        console.log(this.currentStudent);
        this.router.navigateByUrl("/candidature/"+btoa(String(this.currentStudent.id)));
      });
    }else{
      this.validateFormField(submitForm);
    }
  }

  validateFormField(submitForm : FormGroup){
    Object.keys(submitForm.controls).forEach(field =>{
      const  control = submitForm.get(field);
      if (control instanceof  FormControl){
        control.markAsTouched({onlySelf :true});
      }else if (control instanceof  FormGroup){
        this.validateFormField(control);
      }
    })
  }


}
