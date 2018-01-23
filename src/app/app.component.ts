import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './questions.service';
import { NgForm } from '@angular/forms';

import { FormGroup, FormBuilder, Validator } from '@angular/forms';

import { Builder } from 'selenium-webdriver';
import { Validators } from '@angular/forms/src/validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';

  ngOnInit()
  {
    this.getEmailAPI();
    this.getJsonData();
    this.getResultAPI();
  }

  form101 : FormGroup;

  constructor(private QuestionService: QuestionsService, public builder: FormBuilder)
  {
    this.form101 = this.builder.group
    ({
      question1: [null],
      question2: [null],
      question3: [null],
    });
  }

  jsonData = [];
  answers: string[] = [];
  getJsonData()
  {
    this.QuestionService.getJsonData().subscribe
    (
      data =>  console.log('json Data Baru', this.jsonData = data),
      error => console.log('server returns error')
    );
  }

  resultsData = [];
  getResultAPI()
  {
    this.QuestionService.getResultsAPI().subscribe
    (
      data =>  console.log('results', this.resultsData = data),
      error => console.log('server returns error')
    );
  }

  Email = []; 
  isVerified:boolean;
  getEmailAPI()
  {
    this.QuestionService.getEmailAPI().subscribe(
    data =>  console.log('All email',this.Email = data),
    error => console.log('server returns error')
    );
  }

  isTouched:boolean = false;
  isAvailable:boolean = false;
  verifyEmail(formValue)
  {
    if(this.Email.length > 0) 
    {
      this.Email.every(x => 
      {
        return !(this.isVerified = x.email === formValue.userEmail);  
      })
    }

    if(this.isVerified == true)
    {
      this.isAvailable = false;
    }
  }

  pushNewResults()
  {
    console.log('1', this.form101.controls.question1.value);
    console.log('2', this.form101.controls.question2.value);
    console.log('3', this.form101.controls.question3.value);

    this.QuestionService.postSurvey101(this.form101.controls.question1.value, this.form101.controls.question2.value, this.form101.controls.question3.value);//.subscribe();
  }
}
