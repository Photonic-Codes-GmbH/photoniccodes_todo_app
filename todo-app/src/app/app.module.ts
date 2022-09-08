import { NgModule, ɵisListLikeIterable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './pages/overview/todo-list.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDetailComponent } from './pages/userdata/user-detail.component';
import { MaterialModule } from 'material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations:
  [
    AppComponent,
    TodoListComponent,
    LoginComponent,
    UserDetailComponent
  ],
  imports:
  [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
