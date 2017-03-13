import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { Router } from './router/module';

import { AppComponent } from './component';

import { Dashboard } from './dashboard/component';

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
        Dashboard
    ],
    providers: [

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }