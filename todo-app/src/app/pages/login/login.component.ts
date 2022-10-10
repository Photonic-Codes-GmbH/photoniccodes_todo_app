import { LoginService } from './login.service';
import { Component, OnInit, Output } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Output()
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.loginService.getAllUsers().subscribe((incomingUsers: User[]) => this.users = incomingUsers);

  }

   constructor(private loginService: LoginService, private router: Router) { }

  users: User[] = [];

  email: string = '';
  username: string = '';
  userID: number = 0;


  login() {

    /*
    Callback function Varianten:
    () => {

    }
    user => {

    }
    user => doSomething = doThis
    */

    let foundUser = this.users.find(({ username, email }) => this.username == username && this.email == email);
    let foundUserEmail = this.users.find(({email})=> this.email == email);

    if(foundUserEmail){

        if(foundUser){

          this.loginService.currentUser = foundUser;
          this.router.navigate(['/overview']);

        }
        else{
          alert("Benutzername falsch")
          this.username = "";

        }

    }
    else{
      alert("Anmeldedaten falsch");
      this.username = "";
      this.email = "";
    }

  }
}
