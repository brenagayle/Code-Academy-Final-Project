import { Component, OnInit, Input } from '@angular/core';
import { QuizService, Quiz, Questions } from '../services/quiz-service';
import { Router } from '@angular/router';
import { AuthGenericService } from '../../shared/services/auth-generic.service';

// export class RadioNgModelExample {


@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {
  title: string; // Question itself
  answers: Array<string>; // Array of answers, entered by creator
  correct: number; // index of answers array with correct answer
  type: string; // type of question, multiChoice, trueFalse
  creator: string; // ID of who is making the quiz
  quizTitle: string; // title of quiz
  desc: string; // description of quiz

  quizID: string; //ID of quiz returned when posted to db

  visible: boolean = true;


  constructor(private quizService: QuizService, private router: Router, private authService: AuthGenericService) { }

  questions: Array<Object> = [{
    title: '',
    answers: ['', ''],
    correct: 0,
    type: 'multiChoice',
    // points: 0,
  }]; // array of all questions in quiz, defaults to one blank question with first answer listed as correct

  trackByFn(index: any, item: any) {
    return index;
 }

  removeQuestion(idx) {
    this.questions.splice(idx, 1);
  }

  addQuestion() {
    this.questions.push({
      title: '',
      answers: ['', ''],
      correct: 0,
      type: 'multiChoice',
      // points: 0,
    });
    console.log(this.questions);
  }
  removeAnswer(question, idx) {
    console.log(idx);
    question['answers'].splice(idx, 1);
    console.log(this.questions);
  }

  addAnswer(val) {
    this.questions[val]['answers'].push('');
  }

  hideCreateQuiz() {
    let sideBar = document.getElementById('sideBarContent');
    sideBar.remove();
  }

  showThankYou() {
    document.getElementById('thankYou').id = 'visible';
  }

  dashboardButton() {
    this.router.navigate(['/dashboard']);
  }

  trueFalse(){
    this.questions.forEach(question => {
      if (question["type"] === "trueFalse"){
        question["answers"][0] = "true";
        question["answers"][1] = "false";
      }
    });
  }
  
  quizFormSubmit() {
    this.authService.getUserbyID().subscribe(user => {
      this.creator = user[0].displayname;
      this.trueFalse();
      let quiz = {
        title: this.quizTitle,
        description: this.desc,
        creator: this.creator,
        questions: this.questions,
        creatorId: this.authService.userAuth.uid
      }
      this.quizService.postQuiz(quiz)
      .then(res => { 
        this.quizID = res;
        window.scrollTo (0,0);
      });
      this.hideCreateQuiz();
      this.showThankYou();
      this.visible = false;
    })
    

  }
  
  ngOnInit() {
  }
}
