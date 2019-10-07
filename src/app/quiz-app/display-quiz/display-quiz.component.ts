import { QuizService, Quiz } from '../services/quiz-service';
import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButton } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuizGuardComponent } from '../quiz-guard/quiz-guard.component';
import { AuthGenericService } from '../../shared/services/auth-generic.service';
import { User } from '../../shared/interfaces/users';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})

export class DisplayQuizComponent implements OnInit {

  quizId: string = this.route.snapshot.paramMap.get('id');
  creator: string;
  description: string;
  questions: Object[];
  title: string;
  correct: number;
  username: string;

  formControl = new FormControl('');
  x = 0;
  matButton: MatButton; 
  currentUser: User;
  selectedRadio: string;

  userAnswers: number[] = [];
  correctAnswers: number[] = [];
  numberCorrect: number = 0;
  percent;
  completed = false;

  token;
  quiz: Quiz;
  selectedAnswer;
  userScore: any = {
    score: ''
  };
  correctAnswerText;
  nextButton: Boolean = false;

  constructor(public auth: AuthGenericService, private quizService: QuizService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.quizService.getQuizByToken(id).subscribe(data => {
      this.quiz = data;
      this.userAnswers.length = this.quiz.questions.length;
      this.getCorrectAnswers();
    });  
  }

  trackByFn(index: any, item: any) {
    return index;
 }

  onSelectionChange(j, i) {
    this.userAnswers[j] = i;
    console.log(this.userAnswers);
  }

  getCorrectAnswers() {
    for (let i = 0; i < this.quiz.questions.length; i++) {
      let x = this.quiz.questions[i].correct;
      this.correctAnswers.push(x);
      console.log(this.correctAnswers);
    }
  }

  submitButton() {
    this.getCorrectAnswers();
    this.compare(this.userAnswers, this.correctAnswers);
    this.getScore();
    this.completed = true;

    document.getElementById('thankYou').id = 'visible';
    document.getElementById('submitButton').id = 'hidden';

    this.auth.getUserbyID().subscribe(user => {
        this.username = user[0].displayname;
        let data = {
          date: new Date(),
          quizId: this.quizId,
          score: this.percent,
          userId: this.auth.userAuth.uid,
          email: this.auth.userAuth.email,
          username: this.username,
          title: this.quiz.title,
          creator: this.quiz.creator,
          creatorId: this.quiz.creatorId
        }
      this.quizService.postUserAnswers(data);
    })
  }

  compare(userAnswers, correctAnswers) {
    for (let i = 0; i < correctAnswers.length; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        this.numberCorrect++;
      }
    } 
  }

  getScore() {
    this.percent = ((this.numberCorrect / this.quiz.questions.length) * 100).toFixed(2);
  }

  takeQuiz(): void {
    const dialogRef = this.dialog.open(QuizGuardComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed()
  }

}


