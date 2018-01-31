import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//ngx-bootstraps
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

//myDatePicker
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { QuestionsService } from './questions.service';
import { DatepickerModule } from 'ngx-bootstrap/datepicker/datepicker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    MyDatePickerModule,
  ],
  providers: 
  [
    QuestionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }