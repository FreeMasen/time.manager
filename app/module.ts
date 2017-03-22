import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { Router } from './router/module';

import { AppComponent } from './component';

//Components
import { Dashboard } from './dashboard/component';
import { TaskDetail } from './taskDetail/component';

import { Tasks } from './services';

import './rxjs'

@NgModule({
    imports: [
        BrowserModule,
        Router,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        Dashboard,
        TaskDetail,
    ],
    providers: [
        Tasks
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }