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
  // Variables
  loginUser = this.loginService.currentUser?.name;
  loggenInUserID = this.loginService.currentUser?.id;
  loggedInUserName = this.loginService.currentUser?.username;
  loggedInEmail = this.loginService.currentUser?.email;
  profileImage = ''; //this.pics[0].thumbnailUrl;
  isDisabled = true;

  // Getter and setter changeUsername
  private _changeUsername = ''; //ngModel
  // get - set Username
  public get changeUsername() {
    return this._changeUsername;
  }
  public set changeUsername(value) {
    // Prüfen, ob vorher noch nie etwas eingegeben wurde ("pristine")
    if (value.length <= 0) {
      this.isDisabled = true;
    } else if (value.length >= 0) {
      this.isDisabled = false;
    }
    // Hier soll der Button aktiviert werden
    this._changeUsername = value;
  }
  // Getter and setter changeEmail
  private _changeEmail = ''; //ngModel
  public get changeEmail() {
    return this._changeEmail;
  }
  public set changeEmail(value) {
    // Prüfen, ob vorher noch nie etwas eingegeben wurde ("pristine")
    if (value.length <= 0) {
      this.isDisabled = true;
    } else if (value.length >= 1) {
      this.isDisabled = false;
    }
    this._changeEmail = value;
  }

  checkChanges() { // Disable the "Save" button if no changes are made
    this.changeUsername;
    this.changeEmail;
  }

  changes() {
    if (this.changeUsername) {
      //Wenn in der Eingabe der Username geändert wurde
      if (this.changeEmail) {
        //Wenn die E-Mail u. Username geändert wurde

        this.userDetailService.patchUser(this.loginService.currentUser.id, {
          username: this.changeUsername,
          email: this.changeEmail,
        });
        console.log(
          'Username und Email wurden geändert zu: ' +
            this.changeUsername +
            ' und ' +
            this.changeEmail
        );
        this.changeUsername = '';
        this.changeEmail = '';
      } else {
        //Nur der Benutzernamen geändert
        this.userDetailService.patchUser(this.loginService.currentUser.id, {
          username: this.changeUsername,
        });
        console.log('Username wurde geändert zu: ' + this.changeUsername);
        this.changeUsername = '';
      }
    } else {
      //Nur die E-Mail geändert
      this.userDetailService.patchUser(this.loginService.currentUser.id, {
        email: this.changeEmail,
      });
      console.log('Email wurde geändert zu: ' + this.changeEmail);
      this.changeEmail = '';
    }
  }
}
