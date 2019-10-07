import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthGenericService } from './shared/services/auth-generic.service';
import { UserStoreService } from './shared/services/user-store.service';
import { MatDialog } from '@angular/material';
import { QuizGuardComponent } from './quiz-app/quiz-guard/quiz-guard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  opened: boolean = false;
  user$;
  currentLink: string;
  constructor(private router: Router, private authGenericService: AuthGenericService,
    public dialog: MatDialog,
    private userStore: UserStoreService ){
    this.router.events.subscribe(evt => {
      
      if(evt instanceof NavigationEnd) {
        this.currentLink = evt.url.split("/")[1];
        console.log(this.currentLink);
        window.scrollTo(0,0);
      }

      
    });
  }
  takeQuiz(): void {
    const dialogRef = this.dialog.open(QuizGuardComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed();
  }

  signOut() {
    this.authGenericService.signout();
  }
    ngOnInit() {
      this.user$ = this.userStore.user$;
    }
  

}
