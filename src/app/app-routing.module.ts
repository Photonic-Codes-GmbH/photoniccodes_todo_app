import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TodoListComponent } from './pages/overview/todo-list.component';
import { UserDetailComponent } from './pages/userdata/user-detail.component';

const routes: Routes = [
// TODO: hier müssen alle in miro defininierten routes rein

    { path: 'overview', component: TodoListComponent},
    { path: 'login', component: LoginComponent},
    { path: 'userdata', component: UserDetailComponent},
    { path: '', redirectTo: 'overview', pathMatch: 'full'},
    { path: '**', redirectTo: 'overview', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


