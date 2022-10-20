import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAllTodos() { // Get only todos from backend with userId from loggedin user
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      map((response) =>
        response.filter(
          (todo) => todo.userId === this.loginService.currentUser.id
        )
      ),
      catchError(this.handleError)
    );
  }

  // Send a request to the backend with todo update
  patchTodo(id: number, data: any) {
    return this.http.patch(this.todosUrl + id, data);
  }

  // Send a request to the backend for deleteing a todo, with todoId
  deleteTodo(id: number) {
    return this.http.delete(this.todosUrl + id);
  }

  // Send a request to the backend to save a new todo
  postTodo(id: number, data: any) {
    return this.http.post(this.todosUrl + id, data);
  }

  private handleError(err: HttpErrorResponse)
  {
    let errorMessage = '';

    err.error instanceof ErrorEvent ?
    errorMessage = `An error occurred: + ${err.error.message}` :
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    console.error(errorMessage); // FIXME: Delete me
    return throwError(()=>errorMessage);
  }
}
