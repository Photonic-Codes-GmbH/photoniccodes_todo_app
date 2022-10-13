import { LoginService } from './../login/login.service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap, throwError } from "rxjs";
import { Picture } from "../interfaces/pictures";


@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  private photoUrl = "https://jsonplaceholder.typicode.com/photos";
  private userUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAllPictures(){
    return this.http.get<Picture[]>(this.photoUrl).pipe(
      map((response) =>
        response),
      catchError(this.handleError)
    );
  };

  patchUser(id: number, data: any){
    return this.http.patch(this.userUrl + id, data);
  };

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = 'An error occurred: + ${err.error.message}';
    }
    else{
      errorMessage = 'Server returned code: ${err.status}, error message is: ${err.message}';
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage);
  };
};
