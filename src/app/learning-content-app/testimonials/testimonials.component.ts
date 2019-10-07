import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute, ParamMap } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  items: Array<any>;

  id: string;

  contentId: any;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    public db: AngularFirestore
  ) { }

  ngOnInit() {
    this.getData();

    this.route.paramMap.subscribe(params => {
      this.firebaseService.getFile(params.get('id')).subscribe(res => {
        console.log(res);
      })
    });


  }

  getData() {
    this.firebaseService.getTestimonials()
      .subscribe(result => {
        this.items = result;
        console.log(this.items)
      })
  }
}