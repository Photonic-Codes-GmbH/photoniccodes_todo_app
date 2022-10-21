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

    this.changeUsernameElement = document.getElementsByName("changeUsername")[0]
    this.changeEmailElement = document.getElementsByName("changeEmail")[0]
  }

  changeUsernameElement: HTMLElement | undefined
  changeEmailElement: HTMLElement | undefined
  pics: Picture[] = [];
  // Variables
  loginUser = this.loginService.currentUser?.name;
  loggenInUserID = this.loginService.currentUser?.id;
  loggedInUserName = this.loginService.currentUser?.username;
  loggedInEmail = this.loginService.currentUser?.email;
  profileImage = ''; //this.pics[0].thumbnailUrl;
  isDisabled = true; // disable/anable the save button

  onNotify(message: string) {

    console.log(message)
  }

  checkDisabled(){

    let userName = (this.changeUsernameElement as HTMLInputElement).value;
    let email = (this.changeEmailElement as HTMLInputElement).value;

    let combination = userName + email

    combination.length == 0 ? this.isDisabled = true : this.isDisabled = false;
  }

  changeUsername = '';
  changeEmail = '';


  changes() {
    if (this.changeUsername) {
      //Wenn in der Eingabe der Username geändert wurde
      if (this.changeEmail) {
        //Wenn die E-Mail u. Username geändert wurde

        this.userDetailService.patchUser(this.loginService.currentUser.id, {
          username: this.changeUsername,
          email: this.changeEmail,
        });
        // Space for snackbar/alert
        console.log(
          'Username und Email wurden geändert zu: ' +
            this.changeUsername +
            ' und ' +
            this.changeEmail
        );
        this.changeUsername = '';
        this.changeEmail = '';
      } else {
        // If only the username get changed
        this.userDetailService.patchUser(this.loginService.currentUser.id, {
          username: this.changeUsername,
        });
        // TODO: Space for snackbar/alert
        console.log('Username wurde geändert zu: ' + this.changeUsername);
        this.changeUsername = '';
      }
    } else {
      // If only the email get changed
      this.userDetailService.patchUser(this.loginService.currentUser.id, {
        email: this.changeEmail,
      });
      // TODO: Space for snackbar/alert
      console.log('Email wurde geändert zu: ' + this.changeEmail);
      this.changeEmail = '';
    }
  }
}
