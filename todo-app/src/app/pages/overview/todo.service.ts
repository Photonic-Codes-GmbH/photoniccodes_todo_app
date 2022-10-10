import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAllTodos() {
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      map((response) =>
        response.filter(
          (todo) => todo.userId === this.loginService.currentUser.id
        )
      ),
      catchError(this.handleError)
    );
  }

  patchTodo(id: number, data: any) {
    console.log('Patch: ' + this.todosUrl + id, data);
    return this.http.patch(this.todosUrl + id, data);
  }

  deleteTodo(id: number) {
    console.log('Delete: ' + this.todosUrl + id);
    return this.http.delete(this.todosUrl + id);
  }
  postTodo(id: number, data: any) {
    console.log('Post: ' + this.todosUrl + id, data);
    return this.http.post(this.todosUrl + id, data);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occurred: + ${err.error.message}';
    } else {
      errorMessage =
        'Server returned code: ${err.status}, error message is: ${err.message}';
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
