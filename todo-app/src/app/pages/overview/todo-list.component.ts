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
    this.todoService.getAllTodos().subscribe((incommingTodos: Todo[]) => this.todos = incommingTodos);
  }

  constructor(private todoService: TodoService) { }

  todos: Todo[] = [];

  inputTodo: string = ""; //ngModel
  isEdit: boolean = true; // diable/enable "readonly" property


  edit(todoId: number) {
    if(this.isEdit == true){
      this.isEdit = false;
    }else{
      this.isEdit = true;
      this.changes(todoId);
    }
  }

  changes(todoId: number) {
    this.todoService.patchTodo(todoId, { title: this.todos.filter(todo => todo.id === todoId)[0].title });
    console.log({ title: this.todos.filter(todo => todo.id === todoId)[0].title });
  }

  delete(todoId: number) {
    this.todoService.deleteTodo(todoId);
    console.log("Deleted TodoId -> " + todoId);
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
