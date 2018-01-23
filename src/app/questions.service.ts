import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/RX';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class QuestionsService implements OnInit {

  ngOnInit()
  {
    this.getJsonData();
  }

  constructor(private http: Http) { }

  email: string [];
  getEmailAPI(): Observable <any> 
  {
    return this.http.get("http://localhost:8000/AllEmail")
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  //get survey101.json
  getJsonData(): Observable<any>
  {
    return this.http.get('../assets/survey101.json')
    .map((res: Response)=>res.json())
    .catch((error:any)=> Observable.throw(error.json().error || 'server returns error'))
  }

  //get survey102.json
  getJsonData2(): Observable<any>
  {
    return this.http.get('../assets/survey102.json')
    .map((res: Response)=>res.json())
    .catch((error:any)=> Observable.throw(error.json().error || 'server returns error'))
  }
  
  //post
  postSurvey101(question1: string, question2: string, question3: string): Observable<any>
  {
    return this.http.post('http://localhost:8000/push101', {question1: question1, question2: question2, question3: question3})
  }

  getResultsAPI(): Observable<any>
  {
    return this.http.get('http://localhost:8000/selectAllResults')
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }
}