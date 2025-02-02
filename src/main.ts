import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, { 
  providers: [importProvidersFrom(HttpClientModule)] 
}).catch((err) => console.error(err));
