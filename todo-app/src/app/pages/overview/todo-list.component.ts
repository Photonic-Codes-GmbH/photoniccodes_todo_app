import { HttpClient } from "@angular/common/http";
import { identifierName } from "@angular/compiler";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TodoService } from "./todo.service";

@Component({
  selector: 'list-overview',
  templateUrl: './todo-list.component.html',
  styleUrls:['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {

  ngOnInit(): void {

    //this.todoService.getAllUsers().subscribe((incomingUsers: User[]) => this.users = incomingUsers);
    this.todoService.getAllTodos().subscribe((incommingTodos: Todo[]) => this.todos = incommingTodos);
  }

  constructor(private todoService: TodoService) { }

  users: User[] = [];
  todos: Todo[] = [];

  inputTodo: string = "";

  pageTitle: string = 'Todo List';
  newTodo: string | undefined;



  edit(todoId:number) {
    console.log(todoId);
  }

  delete(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    console.log(this.todos);
  }

  addTodo() {
    this.todos.push({
      userId: 1, // TODO: Set the userId to loggedIn Id!!!
      id: this.todos.length+1, // TODO: Set the ID to last of array
      title: this.inputTodo,
      completed: true
    })
    this.inputTodo = "";
  }
}


//TODO: Interface auslagern in extra Datei
// #Interface
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
