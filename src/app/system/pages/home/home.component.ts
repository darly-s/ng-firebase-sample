import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 public user: UserModel

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.user = this.localStorageService.getData('user');
  }
 
   
}
