import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/shared/services/user-store.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  user$;
  constructor(public userStore: UserStoreService) { }

  ngOnInit() {
    this.user$ = this.userStore.user$;
  }
}
