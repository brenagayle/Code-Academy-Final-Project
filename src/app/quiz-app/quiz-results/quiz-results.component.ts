import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {

  quiz = {
    hash: "abc1223", 
    title: "Sample quiz",
    description: "This is a sample quiz",
    instructions: "Please choose the correct answer from the multiple choices below",
    questions: [
      {
        type: "multi",
        prompt: "What is 2+2?",
        choices: [
          "1",
          "2",
          "3",
          "4"
        ],
        correct: 3,
        answered: 2
      },
      {
        type: "multi",
        prompt: "what is the color of the sky",
        choices: [
          "red",
          "green",
          "blue"
        ],
        correct: 2,
        answered: 2
      }
    ],

  };
  constructor() { }

  ngOnInit() {
  }

}
