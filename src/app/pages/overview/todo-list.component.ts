import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
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

  pageTitle: string = 'Todo List';
  newTodo: string | undefined;



  enableEditor(): void {


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
