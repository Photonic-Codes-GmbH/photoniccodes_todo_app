import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { User } from "../interfaces/user";


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap(data=> console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  currentUser!: User;

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    //err.error instanceof ErrorEvent ? errorMessage = 'Ange}' : errorMessage = 'Serveage}';

    if (err.error instanceof ErrorEvent){
      errorMessage = 'An error occurred: + ${err.error.message}';
    }
    else{
      errorMessage = 'Server returned code: ${err.status}, error message is: ${err.message}';
    }


    console.error(errorMessage);
    return throwError(()=>errorMessage);
  }
}
