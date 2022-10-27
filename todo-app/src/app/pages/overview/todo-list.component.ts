import { LoginService } from './../login/login.service';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { __importDefault } from 'tslib';
import { Router } from '@angular/router';
import { TodosComponent } from 'src/app/todos/todos.component';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy, OnChanges {
  loginUser = this.loginService.currentUser?.name;
  isDisabled: boolean = true; //
  inputTodo: string = ''; //ngModel
  isButtonDisabled = 0;
  isShow: boolean = true;
  isDeleted: boolean = false;

  ngOnInit(): void {
    if (!this.loginService.currentUser) this.router.navigate(['/login']);
    console.log('OnInit_todo-list.component');
  }

  ngOnDestroy() {
    console.log('OnDestroy_todo-list.component');
  }

  ngOnChanges() {
    console.log('Changed');
  }

  constructor(
    private todoService: TodoService,
    private loginService: LoginService,
    private router: Router,
    private todoComponent: TodosComponent
  ) {}

  addTodo() {
    this.todoComponent.todos.push({
      userId: this.loginService.currentUser.id,
      id: this.todoComponent.todos.length + 1,
      title: this.inputTodo,
      completed: false,
    });
    this.post(this.todoComponent.todos.length);
    this.inputTodo = '';
    this.isButtonDisabled = 0;
  }

  post(todoId: number) {
    this.todoService.postTodo(todoId, {
      userId: this.loginService.currentUser.id,
      id: todoId,
      title: this.inputTodo,
      completed: false,
    });
  }

  clear() {
    this.todoComponent.todos = [];
  }

  destroyOnClick() {
    this.isShow = false;
    this.isDeleted = true;
  }

  restore(){
    this.isShow = true;
    this.isDeleted = false;
  }
}
