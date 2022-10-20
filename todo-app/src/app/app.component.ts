import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './pages/login/login.service';

@Component({
  selector: 'list-root',
  templateUrl: './app.component.html',
  // TODO: referenz auf app.component.html und die tags da rein
  // TODO: bitte router-outlet verwenden, da sonst das routing nicht funktionieren wird

  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  // Get the loggedin user from the login.service.ts
  getCurrentUser() {
    return this.loginService.currentUser?.name;
  }

  // Get the different routes to show/hide navbar content
  getLoginRoute() {
    return this.router.url === '/login';
  }

  visibleOnUserdataRoute() {
    return this.router.url === '/overview';
  }

  visibleOnOverviewRoute() {
    return this.router.url === '/userdata';
  }

  // Hide the profile button on /userdata
  getHidden(){
    return (this.router.url === '/userdata') ? "hidden" : "visible"
  }
}
