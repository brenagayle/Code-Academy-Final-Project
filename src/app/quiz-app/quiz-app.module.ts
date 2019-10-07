import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizAppComponent } from './quiz-app.component';
import { DisplayQuizComponent } from './display-quiz/display-quiz.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizGuardComponent} from './quiz-guard/quiz-guard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { MyQuizzesComponent } from './my-quizzes/my-quizzes.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { SharedServicesModule } from '../shared/shared-service.module';
import { QuizAppRoutingModule } from './quiz-app-routing.module';


@NgModule({
  declarations: [
    QuizAppComponent,
    DisplayQuizComponent,
    QuizFormComponent,
    DashboardComponent,
    QuizResultsComponent,
    QuizGuardComponent,
    MyQuizzesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuizAppRoutingModule,
    SharedModule,
    MaterialModule,
    SharedServicesModule
  ],
  exports: [
    QuizAppComponent,
    DisplayQuizComponent,
    QuizFormComponent,
    DashboardComponent,
    QuizResultsComponent,
    QuizGuardComponent,
    MyQuizzesComponent
  ]
})
export class QuizAppModule { }
