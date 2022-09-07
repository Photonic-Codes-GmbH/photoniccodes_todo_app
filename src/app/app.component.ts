import { Component } from "@angular/core";


@Component({
  selector: 'list-root',
  templateUrl: './app.component.html',
  // TODO: referenz auf app.component.html und die tags da rein
  // TODO: bitte router-outlet verwenden, da sonst das routing nicht funktionieren wird

  styleUrls:['./app.component.scss']
})
export class AppComponent{
  logInUser: string = "user 1";
}
