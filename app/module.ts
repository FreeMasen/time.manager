import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from './router/module';

import { AppComponent } from './component';

//Components
import { Dashboard } from './dashboard/component';
import { TaskDetail } from './taskDetail/component';
import { TaskListItem } from './taskListItem/component';
import { Settings } from './settings/component';

import { Tasks, DateFormatter, Data } from './services';

import './rxjs'

@NgModule({
    imports: [
        BrowserModule,
        Router,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        Dashboard,
        TaskDetail,
        TaskListItem,
        Settings
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