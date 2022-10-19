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
export class AppComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  currentRoute = '';

  getCurrentUser() {
    return this.loginService.currentUser?.name;
  }

  getLoginRoute() {
    this.currentRoute = this.router.url;
    return this.currentRoute === '/login';
  }

  visibleOnUserdataRoute() {
    this.currentRoute = this.router.url;
    return this.currentRoute === '/overview';
  }

  visibleOnOverviewRoute() {
    this.currentRoute = this.router.url;
    return this.currentRoute === '/userdata';
  }
}
