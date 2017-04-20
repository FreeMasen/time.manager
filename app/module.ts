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


import { Tasks, DateFormatter, Data } from './services';

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
        Calendar
    ],
    providers: [
        Tasks,
        DateFormatter,
        Data
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }