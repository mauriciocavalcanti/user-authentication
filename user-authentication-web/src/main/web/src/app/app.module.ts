import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserModule } from './user/user.module';
import { NotifierModule } from "angular-notifier";
import { WINDOW_PROVIDERS } from 'src/_helpers/window.provider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NotifierModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [CookieService, WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
