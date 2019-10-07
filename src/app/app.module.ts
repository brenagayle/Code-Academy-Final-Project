import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { DualLandingPageComponent } from './dual-landing-page/dual-landing-page';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { SharedServicesModule } from './shared/shared-service.module';
import { QuizAppModule } from './quiz-app/quiz-app.module';
import { AdminComponent } from './admin/admin.component';
import { LearningContentAppModule } from './learning-content-app/learning-content-app.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterFormComponent,
    DualLandingPageComponent,
    AdminComponent
  ],
  imports: [
    ClipboardModule,
    QuizAppModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    LearningContentAppModule,
    SharedServicesModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
