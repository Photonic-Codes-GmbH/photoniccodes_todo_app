import { TodoService } from './../pages/overview/todo.service';
import { Component, Injectable, OnInit, OnDestroy, OnChanges, SimpleChange, SimpleChanges, Input } from '@angular/core';
import { Todo } from '../pages/interfaces/todo';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'all-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy, OnChanges {
  todos: Todo[] = [];
  isEdit: boolean = true; // diable/enable "readonly" property
  isChanged: boolean = false; // Change between readonly and editable todo´s
  serviceOnline = this.todoService
  .getAllTodos()
  .subscribe((incommingTodos: Todo[]) => (this.todos = incommingTodos));
  @Input() isCleard!: boolean;
  message!: string;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.serviceOnline;
  }

  ngOnChanges(changes : SimpleChanges){
    console.log(changes)
    console.log('Changes')
  }

  ngOnDestroy() {
    console.log('OnDestroy_todos.component');
  }

  edit(todoId: number) {
    if (this.isEdit == true) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      this.isChanged = true;
      this.changes(todoId);
    }
  }

  changes(todoId: number) {
    if (this.isChanged == true) {
      //changes via edit
      this.todoService.patchTodo(todoId, {
        title: this.todos.filter((todo) => todo.id === todoId)[0].title,
      });
      this.isChanged = false;
    } else if (this.isChanged == false) {
      // changes via checkbox
      if (
        this.todos.filter((todo) => todo.id === todoId)[0].completed == true
      ) {
        this.todoService.patchTodo(todoId, { completed: false });
      } else {
        this.todoService.patchTodo(todoId, { completed: true });
      }
    }
  }

  delete(todoId: number) {
    this.todoService.deleteTodo(todoId);
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  trackByIdx(index: number): any {
    return index;
  }
}
