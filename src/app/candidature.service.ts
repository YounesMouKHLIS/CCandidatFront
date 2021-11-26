import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from './model/student.model';
import {any} from 'codelyzer/util/function';

@Injectable({
  providedIn: 'root'
})
export class candidatureService {

  public host:string ="http://localhost:8080"


  constructor(private http:HttpClient) { }

  public getResource(){
   // return this.http.get(this.host+"/students?page="+page+"&size="+size); (page:number,size:number)
    return this.http.get(this.host+"/students");

  }

  public getCandidature(){   //page:number,size:number)
    return this.http.get(this.host+"/candidatures"); //?page="+page+"&size="+size
  }
  public SaveUserProfile(formData: FormData):Observable<any>{
    return this.http.post('http://localhost:8080/saveUserProfileServer', formData);

  }

  public SaveForeignStdProfile(formData: FormData):Observable<any>{
    return this.http.post('http://localhost:8080/saveForeignStudentServer', formData);

  }
  public saveCandidatureStudentInServer(id, formData: FormData):Observable<any> {
    return this.http.post('http://localhost:8080/saveCandidatureServer/'+id, formData);
  }

  public saveCandidatureStudent(id, formData: FormData):Observable<any> {
    return this.http.post('http://localhost:8080/saveCandidature/'+id, formData);
  }

  public sendEmail(formD): Observable<any>{
    return this.http.post('http://localhost:8080/sendEmail',formD);
  }


  public getStudentRessource(data):Observable<any>{
    return this.http.get(data);
  }


  public ChangeStateAccepter(id) :Observable<any>{
    return this.http.post(this.host+'/candidature/accepter/'+id,any);
  }

  public ChangeStateRefuser(id,formData:FormData) :Observable<any>{
    return this.http.post(this.host+'/candidature/refuser/'+id,formData);
  }
}
