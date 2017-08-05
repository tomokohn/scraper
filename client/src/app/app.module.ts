import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MainViewComponent } from './main-view/main-view.component';

import { HttpClient } from './httpClient'
import { SearchService } from'./search/search.service'

//PrimeNG
import {DataTableModule,SharedModule} from 'primeng/primeng';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MainViewComponent,
    LoaderComponent

  ],
  imports: [
    BrowserModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    HttpClient,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
