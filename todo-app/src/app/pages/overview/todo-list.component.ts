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

  ngOnInit(): void
  {
    this.todoService.getAllTodos().subscribe((incommingTodos: Todo[]) => this.todos = incommingTodos);
  }

  constructor(private todoService: TodoService) { }

  todos: Todo[] = [];

  inputTodo: string = ""; //ngModel
  isEdit: boolean = true; // diable/enable "readonly" property
  isChanged: boolean = false; //


  edit(todoId: number) {
    if(this.isEdit == true){
      this.isEdit = false;
    }else{
      this.isEdit = true;
      this.isChanged = true;
      this.changes(todoId);
    }
  }

  changes(todoId: number) {
    if(this.isChanged == true){ //changes via edit
      this.todoService.patchTodo(todoId, { title: this.todos.filter(todo => todo.id === todoId)[0].title });
      this.isChanged = false;
      console.log({ title: this.todos.filter(todo => todo.id === todoId)[0].title }); //TODO: delete me
    }
    else if(this.isChanged == false){ // changes via checkbox
      if(this.todos.filter(todo => todo.id === todoId)[0].completed == true){
        this.todoService.patchTodo(todoId, { completed: false });
      }
      else{
        this.todoService.patchTodo(todoId, { completed: true });
      }
    }
  }

  delete(todoId: number) {
    this.todoService.deleteTodo(todoId);
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    console.log("Deleted TodoId -> " + todoId);
  }

  addTodo() {
      this.todos.push({
      userId: 1, // FIXME: Set the userId to loggedIn userId!!!
      id: this.todos.length + 1,
      title: this.inputTodo,
      completed: false
    });
    this.post(this.todos.length);
    this.inputTodo = "";
  }

  post(todoId: number){
    this.todoService.postTodo(todoId,
    { userId: 1, //FIXME: Set the userId to loggedIn userId!!!
      id: todoId,
      title: this.inputTodo,
      completed: false});
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
