import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class QuizService {
  quizCollection: AngularFirestoreCollection<Quiz>;
  quizDoc: AngularFirestoreDocument<Quiz>;
  resultsCollection: AngularFirestoreCollection<Results>
  resultsDoc: AngularFirestoreDocument<Results>

  constructor(private afs: AngularFirestore) { 
    this.quizCollection = this.afs.collection('quiz');
    this.resultsCollection = this.afs.collection('results');
  }

  postQuiz(quiz) {
    return this.quizCollection.add(quiz).then(ref => ref.id);
  }

  getResultsByAdmin(id) {
    return this.afs.collection('results', ref => ref.where('creatorId', '==', id)).snapshotChanges().pipe(map(actions => {
      return actions.map(x => {
        const data = x.payload.doc.data() as Quiz;
        const id = x.payload.doc.id;
        return { id, ...data}  
      })
    }))
  } 

  quiz: Quiz;
  errorMsg: string;
  token: string;

  getAllQuizes() {
    return this.quizCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(x => {
        const data = x.payload.doc.data() as any
        const id = x.payload.doc.id
        return { id, ...data}
      })
    }))
  }

  getQuizByToken(id: string) {
    
    this.quizDoc = this.afs.doc<Quiz>(`/quiz/${id}`);
    console.log(this.quizDoc);
    return this.quizDoc.valueChanges();
  }

  getQuizResultsByQuizId(id) {
    return this.afs.collection('results', ref => ref.where('quizId', '==', id)).snapshotChanges().pipe(map(actions => {
      return actions.map(x => {
        const data = x.payload.doc.data() as Results;
        const id = x.payload.doc.id;
        return { id, ...data};
      });
    }));
  }

  getQuizResultsByUserId(id) {
    return this.afs.collection('results', ref => ref.where('userId', '==', id)).snapshotChanges().pipe(map(actions => {
      return actions.map(x => {
        const data = x.payload.doc.data() as Results;
        const id = x.payload.doc.id;
        return { id, ...data}
      })
    }))
  }

  postUserAnswers(data) {
    this.resultsCollection.add(data);
  }

}


export interface Quiz {
  title?: string
  description?: string
  questions?: Array<Questions>
  creator?: string
  creatorId?: string
}

export interface Questions {
  answers?: []
  correct?: number
  points?: number
  title?: string
  type?: string
}

export interface Results {
  quizId: string
  score: number
  userId: string
  userName: string
  date: string
}
