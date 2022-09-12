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
  changes: string = "";

  inputTodo: string = ""; //ngModel
  changedTodo: any;


  pageTitle: string = 'Todo List';
  newTodo: string | undefined;
  isEdit: boolean = true;


  edit(todoID: number) {
    if(this.isEdit == true){
      this.isEdit = false;
    }else{
      this.isEdit = true;
      this.changedEdit(todoID);
    }
  }

  changedEdit(todoID: number) {
    this.todoService.patchTodo(todoID, { title: this.todos.filter(todo => todo.id === todoID)[0].title });
    console.log({ title: this.todos.filter(todo => todo.id === todoID)[0].title });
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

  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
