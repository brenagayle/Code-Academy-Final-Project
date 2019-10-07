import { QuizResultsComponent } from './../quiz-results/quiz-results.component';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.scss']
})
export class MyQuizzesComponent implements OnInit {
  results: Object[] = [
    {}
  ];
  displayedColumns = ['title', 'dateCreated', 'averageScore', ];
  constructor() { }

  ngOnInit() {

  }


}
