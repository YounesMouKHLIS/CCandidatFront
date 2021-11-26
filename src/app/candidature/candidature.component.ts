import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {candidatureService} from '../candidature.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {

  public id;
  reactiveForm: FormGroup;
  userPhoto: File;
  userCv: File;
  userLetter: File;
  currentCandida;
  subject: string = 'Candidature master';
  subject3: string = 'Activation de votre compte ESAFE';
  subject1: string = 'Candidature déposée';

  body: string = 'votre demande est en cours de traitement';
  body1: string = 'Bonjour Moukhlis,\n' +
    '\n' +
    'Félicitations, vous venez de posutler votre candidature au master de Fertilisation des terres à l\'école d\'agrigulture ESAFE, de l’Université Mohammed VI Polytechnique !\n' +
    'Nous sommes ravis de l’intérêt que vous portez à nos formations.\n' +
    'Pour suivre votre demande, merci de bien vouloir cliquer sur :\n' +
    'https://admission.esafe-um6p.ma/activate/abbb35bcf3ede6660c804ea301218f16\n' +
    '\n' +
    'Vous pourrez ensuite vous connecter à la plateforme de candidature, à travers le lien suivant : https://www.esafe-um6p.ma/login.\n' +
    '\n' +
    'L’équipe des admissions reste à votre disposition pour vous accompagnera dans l’ensemble de vos démarches.\n' +
    '\n' +
    'Votre demande est en cours de traitement \n'+
    'Sans nouvelles de notre part dans un délai de trois semaines, veuillez considérer que nous n\'avons pas pu donner une suite favorable à votre candidature. \n'+
    'Cordialement,\n' +
    'Admissions ESAFE\n' +
    'Tel. + 212 (0) 6 61 91 94 77\n' +
    'admissions.ESAFE@um6p.ma\n' +
    'https://www.esafe-um6p.ma'

  constructor(private fb: FormBuilder, private router: Router, private  activatedRoute: ActivatedRoute, private  candidaSer: candidatureService) {
    this.reactiveForm = this.fb.group({
      description: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[a-zA-z]*'), Validators.minLength(3)])]),


    });
  }

  ngOnInit(): void {
    this.id = atob(this.activatedRoute.snapshot.params.id);
    console.log(this.id);

  }

  onSelectLetter(event) {
    const file = event.target.files[0];
    this.userLetter = file;
    console.log(file);
  }

  onSelectCv(event) {
    const file = event.target.files[0];
    this.userCv = file;
    console.log(file);
  }

  onSelectPhoto(event) {
    const file = event.target.files[0];
    this.userPhoto = file;
    console.log(file);

  }

  saveFromCandidature(submitForm: FormGroup) {
    if (submitForm.valid) {
      const formData = new FormData();
      formData.append('cin', this.userPhoto);
      formData.append('cv', this.userCv);
      formData.append('lettre', this.userLetter);
      this.candidaSer.saveCandidatureStudentInServer(this.id, formData).subscribe((res) => {

        this.currentCandida = res.student.email;
        console.log(this.currentCandida);
        const formD = new FormData();
        formD.append('email', this.currentCandida);
        formD.append('body', this.body1);
        formD.append('subject', this.subject1);
        this.candidaSer.sendEmail(formD).subscribe((res) => {
          const data = res;
          console.log(data);
        });
      });


    } else {
      this.validateFormField(submitForm);
    }

  }

  validateFormField(submitForm: FormGroup) {
    Object.keys(submitForm.controls).forEach(field => {
      const control = submitForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateFormField(control);
      }
    });
  }


}
