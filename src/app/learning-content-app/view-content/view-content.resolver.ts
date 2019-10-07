import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class ViewContentResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let UID = route.paramMap.get('id');
      this.firebaseService.getFile(UID)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}