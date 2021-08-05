import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import {HeroesService} from './services/heroes.service';


@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [

    HeroesService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
