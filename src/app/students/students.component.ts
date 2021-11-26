import {Component, OnInit} from '@angular/core';
import {candidatureService} from '../candidature.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: any;
  size: number = 5;
  candidatures;
  filename: any;
  image;
  mode: number = 0;
  imageCin;
  cvNamee;
  letter;
  selected;
  wewe: any;
  currentStudent: any;

  displayPdf = 'none';
  displayImage = 'none';
  pdfSrc = '';
  imageSrc = '';
  useBrowserLocale = true;
  currentCandidature: any;

  reactiveForm: FormGroup;
  body: string;
  subject: string;



  constructor(private  candidaServ: candidatureService, private sanitizer: DomSanitizer, private router: Router,private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      etat: new FormControl(),


    })
  }

  ngOnInit(): void {
  }

  onGetStudents() {
    this.candidaServ.getResource()  //this.currentPage,this.size
      .subscribe(data => {
        this.students = data;
      }, error => {
        console.log(error);
      });

  }

  onGetCandidature() {
    this.mode=1;
    this.candidaServ.getCandidature().subscribe(data => {
      this.candidatures = data;
      console.log(data);
    });
  }


  showStudent(s: any) {
    this.mode = 2;

    console.log(s);
    this.selected = s;
    this.cvNamee = s.cvName;
    this.imageCin = s.photoName;
    this.letter = s.letterName

    this.wewe = s._links.student.href;
    this.candidaServ.getStudentRessource(this.wewe).subscribe(data => {
      this.currentStudent = data;

    });
  }

  viewPdf(url: string): void {
    this.displayPdf = 'block';
    this.displayImage = 'none';
    this.pdfSrc = url;
    console.log("this.pdfSrc")
    console.log(this.pdfSrc)
  }
  viewImage(src: string): void {
    this.displayPdf = 'none';
    this.displayImage = 'block';
    this.imageSrc = src;
  }


  accepterCandidature() {
    console.log(this.selected)
    this.currentCandidature=this.selected.id
    this.candidaServ.ChangeStateAccepter(this.currentCandidature).subscribe(res=>{
      console.log(res);
      this.body="Votre candidature au Master d'agriculture au sein de l'ecole Um6p à été accepté, veuillez vous rendre a l'institue pour rendre les pieces suivante a fin de finaliser votre inscription. dernier delais le 30juin 2021";
      this.subject="Candidature ESAFE accepter";
      const formD = new FormData();
      formD.append('email', this.currentStudent.email);
      formD.append('body', this.body);
      formD.append('subject', this.subject);
      this.candidaServ.sendEmail(formD).subscribe(res=>{
        const data = res;
        console.log(data);

      });

    });

  }

  refuserCandidature(data) {
    console.log(this.selected)
    this.currentCandidature=this.selected.id
    const justif = data.justification;
    const formData = new FormData();
    formData.append('justif',JSON.stringify(justif));
    this.candidaServ.ChangeStateRefuser(this.currentCandidature,formData).subscribe(res=>{
      console.log(res)
      this.body= 'Je tiens d\'abord à te remercier pour ta candidature spontanée, et pour l\'intérêt que tu as manifesté pour ESAFE. \n' +
        'Malheureusement, Votre candidature au Master d\'agriculture au sein de l\'ecole ESAFE à été rejeté due a la cause suivante:' +justif+'\n'+
        'J\'espère que cela ne va pas te décourager, ton profil est très intéressant. D\'ailleurs, je me permets de le mettre de côté pour le cas où nous aurions des besoins dans ton domaine, plus tard. \n'+
        'Bonne chance pour la suite de tes recherches \n'+
        'Cordialement,\n' +
        'Admissions ESAFE\n' +
        'Tel. + 212 (0) 6 61 91 94 77\n' +
        'admissions.ESAFE@um6p.ma\n' +
        'https://www.esafe-um6p.ma'

      this.subject="Candidature ESAFE refuser"
      const formD = new FormData();
      formD.append('email', this.currentStudent.email);
      formD.append('body', this.body);
      formD.append('subject', this.subject);
      this.candidaServ.sendEmail(formD).subscribe(res=>{
        const data = res;
        console.log(data);
      });

    });
  }
}

