import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from './todo.service';
import { __importDefault } from 'tslib';
import { Router } from '@angular/router';


@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit
{
  ngOnInit(): void
  {
    if(!this.loginService.currentUser) this.router.navigate(['/login' ])

    this.todoService
      .getAllTodos()
      .subscribe((incommingTodos: Todo[]) => (this.todos = incommingTodos));
  }

  constructor(
    private todoService: TodoService,
    private loginService: LoginService,
    private router: Router
  ) {}

  todos: Todo[] = [];
  loginUser = this.loginService.currentUser?.name;
  isDisabled = true; //
  isEdit: boolean = true; // diable/enable "readonly" property
  isChanged: boolean = false; // Change between readonly and editable todo´s

  // Getter and setter to manipulate the inputfield
  inputTodo: string = ''; //ngModel
  // public get inputTodo(): string
  // {
  //   return this._inputTodo;
  // }

  // public set inputTodo(value: string)
  // {
  //   if(value.length <= 0)
  //   {
  //     this.isDisabled = true;
  //   }
  //   else if (value.length >= 1)
  //   {
  //     this.isDisabled = false;
  //   this._inputTodo = value;
  //   }
  // }

  isButtonDisabled = 0

  edit(todoId: number)
  {
    if (this.isEdit == true)
    {
      this.isEdit = false;
    }
    else
    {
      this.isEdit = true;
      this.isChanged = true;
      this.changes(todoId);
    }
  }

  changes(todoId: number)
  {
    if (this.isChanged == true)
    {
      //changes via edit
      this.todoService.patchTodo(todoId, {
        title: this.todos.filter((todo) => todo.id === todoId)[0].title,
      });
      this.isChanged = false;
    }
    else if (this.isChanged == false)
    {
      // changes via checkbox
      if (this.todos.filter((todo) => todo.id === todoId)[0].completed == true)
      {
        this.todoService.patchTodo(todoId, { completed: false });
      }
      else
      {
        this.todoService.patchTodo(todoId, { completed: true });
      }
    }
  }

  delete(todoId: number)
  {
    this.todoService.deleteTodo(todoId);
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  addTodo()
  {
    this.todos.push({
      userId: this.loginService.currentUser.id,
      id: this.todos.length + 1,
      title: this.inputTodo,
      completed: false,
    });
    this.post(this.todos.length);
    this.inputTodo = '';
  }

  post(todoId: number)
  {
    this.todoService.postTodo(todoId, {
      userId: this.loginService.currentUser.id,
      id: todoId,
      title: this.inputTodo,
      completed: false,
    });
  }

  trackByIdx(index: number, obj: any): any
  {
    return index;
  }
}
