import { UserStoreService } from '../services/user-store.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,  } from 'rxjs';
import { AuthGenericService } from '../services/auth-generic.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userStore.user$.pipe(map( user => {
        if (user && user.permission === 'admin') {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
        }
      ));
      }
    }
