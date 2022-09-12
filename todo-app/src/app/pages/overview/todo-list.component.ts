import { HttpClient } from "@angular/common/http";
import { identifierName } from "@angular/compiler";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { User, Todo } from "../interfaces/todo";
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
  editTodos: Todo[] = [];

  inputTodo: string = "";

  pageTitle: string = 'Todo List';
  newTodo: string | undefined;
  isEdit: boolean = true;


  edit(todoId:number) {
    if(this.isEdit == true){
      this.isEdit = false;
    }else{
      this.isEdit = true;
    }
  }

  delete(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    console.log(this.todos);
  }

  addTodo() {
    this.todos.push({
      userId: 1, // TODO: Set the userId to loggedIn Id!!!
      id: this.todos.length+1, // Set the ID to last of array
      title: this.inputTodo,
      completed: true
    })
    this.inputTodo = "";
  }
}
