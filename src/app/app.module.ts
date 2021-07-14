import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { MenuComponent } from './menu/menu.component';
import {ReactiveFormsModule} from '@angular/forms'; //formularios

import {HttpClientModule  } from '@angular/common/http'; //http
import { CommonModule } from '@angular/common';
import { Test2Component } from './test2/test2.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ReporteComponent,
    ConsultaComponent,
    MenuComponent,    
    Test2Component,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,     
    ReactiveFormsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
