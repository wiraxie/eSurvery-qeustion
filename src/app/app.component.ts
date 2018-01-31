import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './questions.service';
import { NgForm } from '@angular/forms';

import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { Builder } from 'selenium-webdriver';
import { INVALID } from '@angular/forms/src/model';
//import { Validators } from '@angular/forms/src/validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';
  private selectedEmail: string = "";
  isTouched:boolean = false;

  dateNow : Date = new Date();

  ngOnInit()
  {
    /*tarik email dari mySql*/
    //this.getEmailAPI();
    
    /*tarik data json*/
    //this.getJsonData();
    //this.getJsonData2();
  }

  //declare form groups
  form101 : FormGroup;
  form102 : FormGroup;

  formSepsis: FormGroup;
  disableBtn = false;
  public myDatePickerOptions: IMyDpOptions = 
  {
    dateFormat: 'dd-mmm-yyyy',
  };
  
  setDate(): void 
  {
    let date = new Date();
    this.formSepsis.patchValue({tanggalLahir: {
    date: 
    {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }},tanggalMasuk:{ 
    date:
    {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }}
    });
  }

  clearDate(): void 
  {
    this.formSepsis.patchValue({tanggalMasuk: null ,tanggalLahir: null});
  }
  sudah:boolean = false;

  constructor(private QuestionService: QuestionsService, public builder: FormBuilder)
  {

    this.form101 = this.builder.group
    ({
      question1: [null],
      question2: [null],
      question3: [null],
    });

    this.form102 = this.builder.group
    ({
      question4: [null],
      question5: [null],
      question6: [null],
    })

    this.formSepsis = this.builder.group
    ({
      institusi: [null ,Validators.required],
      tanggalMasuk: [null, Validators.required],
      tanggalLahir: [null, Validators.required],
      perawatan: [null, Validators.required],
      kelamin: ['', Validators.required],
      kasus: ['', Validators.required],
      ventilator: ['', Validators.required],
      renjatan: ['', Validators.required],
      picu: ['', Validators.required],
      luaran: ['', Validators.required],
      port: ['', Validators.required],
      nutrisi: ['', Validators.required],
      imunisasi: ['', Validators.required],
      komorbiditas: ['', Validators.required],
      pews: ['', Validators.required],
      gcs: ['', Validators.required],
      pupil: ['', Validators.required],
      laktat: ['', Validators.required],
      map1: ['', Validators.required],
      map2: ['', Validators.required],
      map3: ['', Validators.required],
      map4: ['', Validators.required],
      map5: ['', Validators.required],
      map6: ['', Validators.required],
      kreatinin1: ['', Validators.required],
      kreatinin2: ['', Validators.required],
      kreatinin3: ['', Validators.required],
      kreatinin4: ['', Validators.required],
      kreatinin5: ['', Validators.required],
      kreatinin6: ['', Validators.required],
      pao: ['', Validators.required],
      paco: ['', Validators.required],
      ventilasi: ['', Validators.required],
      lekosit: ['', Validators.required],
    })
    this.formSepsis.valueChanges.subscribe((changedObj: any) => 
    {
      this.disableBtn = this. formSepsis.valid;
    });
  }

  //survey101.json
  jsonData = [];  
  getJsonData()
  {
    this.QuestionService.getJsonData().subscribe
    (
      data =>  console.log('Data survey101.json', this.jsonData = data),
      error => console.log('server returns error')
    );
  }

  //survey102.json
  jsonData2 = [];
  getJsonData2()
  {
    this.QuestionService.getJsonData2().subscribe
    (
      data =>  console.log('Data survey102.json', this.jsonData2 = data),
      error => console.log('server returns error')
    );
  }

  isVerified:boolean;

  verifyEmail(email) 
  {
    this.QuestionService.verifyEmailAPI(email).subscribe();
    this.isVerified = true;
    console.log('email', email);
  }

  //push survey101
  pushForm101()
  {
    console.log('1', this.form101.controls.question1.value);
    console.log('2', this.form101.controls.question2.value);
    console.log('3', this.form101.controls.question3.value);

    this.QuestionService.postSurvey101
    (
      this.form101.controls.question1.value, 
      this.form101.controls.question2.value, 
      this.form101.controls.question3.value
    ).subscribe();
  
    this.form101.reset();
  }

  //push survey102
  pushForm102()
  {
    console.log('4', this.form102.controls.question4.value);
    console.log('5', this.form102.controls.question5.value);
    console.log('6', this.form102.controls.question6.value);

    this.QuestionService.postSurvey102
    (
      this.form102.controls.question4.value, 
      this.form102.controls.question5.value, 
      this.form102.controls.question6.value
    ).subscribe();
  
    this.form102.reset();
  }

  hasil : object = new Object();
  
  pushFormSepsis()
  {
    this.hasil = 
    [
      {"institusi" : this.formSepsis.controls.institusi.value},
      {"tanggal masuk" : this.formSepsis.controls.tanggalMasuk.value},
      {"tanggal lahir" :this.formSepsis.controls.tanggalLahir.value},
      {"perawatan hari ke": this.formSepsis.controls.perawatan.value},
      {"jenis kelamin":this.formSepsis.controls.kelamin.value},
      {"kasus": this.formSepsis.controls.kasus.value},
      {"ventilator": this.formSepsis.controls.ventilator.value},
      {"renjatan sepsis": this.formSepsis.controls.renjatan.value},
      {"lama rawat PICU" :this.formSepsis.controls.picu.value},
      {"luaran": this.formSepsis.controls.luaran.value},
      {"port sepsis": this.formSepsis.controls.port.value},
      {"status nutrisi": this.formSepsis.controls.nutrisi.value},
      {"status imunisasi sesuai usia": this.formSepsis.controls.imunisasi.value},
      {"komordibitas": this.formSepsis.controls.komorbiditas.value}, 
      {"warning signs": this.formSepsis.controls.pews.value},
      {"gcs": this.formSepsis.controls.gcs.value},
      {"reaksi pupil": this.formSepsis.controls.pupil.value},
      {"laktat": this.formSepsis.controls.laktat.value},
      {"map 0-<1": this.formSepsis.controls.map1.value},
      {"map 1-11": this.formSepsis.controls.map2.value},
      {"map 12-23": this.formSepsis.controls.map3.value},
      {"map 24-59": this.formSepsis.controls.map4.value},
      {"map 60-143": this.formSepsis.controls.map5.value},
      {"map >=144": this.formSepsis.controls.map6.value},
      {"kreatinin 0-<1": this.formSepsis.controls.kreatinin1.value},
      {"kreatinin 1-11": this.formSepsis.controls.kreatinin2.value},
      {"kreatinin 12-23": this.formSepsis.controls.kreatinin3.value},
      {"kreatinin 24-59": this.formSepsis.controls.kreatinin4.value},
      {"kreatinin 60-143": this.formSepsis.controls.kreatinin5.value},
      {"kreatinin >=144": this.formSepsis.controls.kreatinin6.value},
      {"PaO2": this.formSepsis.controls.pao.value},
      {"PaCO2": this.formSepsis.controls.paco.value},
      {"ventilasi mekanik": this.formSepsis.controls.ventilasi.value},
      {"lekosit": this.formSepsis.controls.lekosit.value}
    ];

    console.log(this.hasil);
    //console.log('Stringify' ,JSON.stringify(this.hasil));
    this.formSepsis.reset();
  }
}