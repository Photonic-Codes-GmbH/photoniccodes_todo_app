import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { User } from "../interfaces/user";


@Injectable({
  providedIn: 'root',
})

export class LoginService
{
  private userUrl = "https://jsonplaceholder.typicode.com/users";
  currentUser!: User;

  constructor(private http: HttpClient) {}

  // Get all saved user from the backend
  getAllUsers()
  {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap(data=> data),
      catchError(this.handleError)
    );
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
