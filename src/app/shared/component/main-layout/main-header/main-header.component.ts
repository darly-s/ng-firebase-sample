import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor( 
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }
  
  public async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
