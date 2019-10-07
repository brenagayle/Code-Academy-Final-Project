import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { DualLandingPageComponent } from './dual-landing-page/dual-landing-page';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './shared/guards/admin.guard';
const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterFormComponent},
  { path: 'dual-landing-page', component: DualLandingPageComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: 'learning', loadChildren: () => import('./learning-content-app/learning-content-app.module').then(mod => mod.LearningContentAppModule) },
  { path: 'quiz', loadChildren: () => import('./quiz-app/quiz-app.module').then(mod => mod.QuizAppModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

