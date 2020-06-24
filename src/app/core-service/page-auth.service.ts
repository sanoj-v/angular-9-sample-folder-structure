import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class PageAuthGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _auth: AuthService
        ) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._auth.getRole == 'Admin') {
            return true;
        }
        this._router.navigate(['error/401']);
        return false;
    }
} 