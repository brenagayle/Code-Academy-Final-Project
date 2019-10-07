import { AuthGenericService } from '../../shared/services/auth-generic.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../services/quiz-service';
import { UserStoreService } from '../../shared/services/user-store.service';
import { async } from '@angular/core/testing';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  creatorId: Number;
  quizzes: Object[] = [];
  quizResults: Object[] = [];
  results: Object[] = [];
  token;
  quizsTakenColumns = ['score', 'instructor', 'quizTitle', 'quizId', 'date' ];
  quizsCreatedColumns = ['score', 'student', 'quizTitle', 'quizId', 'date' ];
  canSeeMyQuizes = false;
  teacherQuizzesData: MatTableDataSource<any>;
  takenQuizzesData: MatTableDataSource<any>;
  userQuizes: Object[] = [];
  adminScores: Object[] = [];
  user$;


  constructor(private authService: AuthGenericService, private quizService: QuizService, public userStore: UserStoreService) { }

  getQuizzes(creatorId) {
    console.log(this.quizzes);
  }

  getScores() {
    const id = this.authService.getUserInfo().uid;
    this.quizService.getQuizResultsByUserId(id).subscribe(res => {
      this.takenQuizzesData = new MatTableDataSource(res);
      this.takenQuizzesData.sort = this.sort;
      this.takenQuizzesData.paginator = this.paginator;
      console.log(res);
    });
  }

  getAdminScores() {
    let creatorId = this.authService.getUserInfo().uid;
    this.quizService.getResultsByAdmin(creatorId).subscribe(res => {
      this.teacherQuizzesData = new MatTableDataSource(res);
      this.teacherQuizzesData.sort = this.sort;
      this.teacherQuizzesData.paginator = this.paginator;
      console.log(res);
    });
  }
  applyQuizzesFilter(filterValue: string) {
    this.takenQuizzesData.filter = filterValue.trim().toLowerCase();
  }
  applyTeacherFilter(filterValue: string) {
    this.teacherQuizzesData.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.user$ = this.userStore.user$;
    this.getScores();
    this.getAdminScores();
  }
}
