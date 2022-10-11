import { Component, OnInit } from '@angular/core';
import { Picture } from '../interfaces/pictures';
import { LoginService } from '../login/login.service';
import { UserDetailService } from './user-detail.service';

@Component({
  selector: 'ta-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private userDetailService: UserDetailService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userDetailService
      .getAllPictures()
      .subscribe((incommingPics: Picture[]) => {
        this.pics = incommingPics;
        this.profileImage = this.pics[0].thumbnailUrl;
      });
  }

  pics: Picture[] = [];
  loginUser = this.loginService.currentUser.name;

  userID = this.loginService.currentUser.id;
  userName = this.loginService.currentUser.username;
  email = this.loginService.currentUser.email;
  profileImage = ''; //this.pics[0].thumbnailUrl;
}
