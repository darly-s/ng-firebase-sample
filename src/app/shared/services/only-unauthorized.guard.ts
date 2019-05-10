
import { Injectable } from '@angular/core'
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()

export class OnlyUnauthorizedGuard implements CanActivate {
    constructor( 
        private authService: AuthService,
        private router: Router
        ) {}

    public canActivate(): boolean {
        if(!this.authService.isLoggedIn()) { 
            return true;
        }
        this.router.navigate(['/system/home']);
        return false;
    }
}