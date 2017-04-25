import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from './router/module';

import { AppComponent } from './component';

//Components
import { Dashboard } from './dashboard/component';
import { TaskDetail } from './taskDetail/component';
import { TaskListItem } from './taskListItem/component';
import { Settings } from './settings/component';
import { Calendar } from './calendar/component';
import { CalendarRow } from './calendarRow/component';


import { DateFormatter, Data, Calculator } from './services';

import './rxjs'

@NgModule({
    imports: [
        BrowserModule,
        Router,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        Dashboard,
        TaskDetail,
        TaskListItem,
        Settings,
        Calendar,
        CalendarRow
    ],
    providers: [
        DateFormatter,
        Data,
        Calculator
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }