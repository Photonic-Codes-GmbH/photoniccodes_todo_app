import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { User, Todo } from "../interfaces/todo";


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private userUrl = "https://jsonplaceholder.typicode.com/users";
  private todosUrl = "https://jsonplaceholder.typicode.com/todos";

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap(/*data=> console.log('All', JSON.stringify(data))*/),
      catchError(this.handleError)
    );
  }

  getAllTodos(){
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      tap(data=> console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  patchTodo(id: number, data: any) {
    return this.http.patch(this.todosUrl + id, data)
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = 'An error occurred: + ${err.error.message}';
    }
    else{
      errorMessage = 'Server returned code: ${err.status}, error message is: ${err.message';
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage);
  }
}
