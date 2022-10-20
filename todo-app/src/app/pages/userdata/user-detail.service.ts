import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { Picture } from "../interfaces/pictures";


@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  private photoUrl = "https://jsonplaceholder.typicode.com/photos";
  private userUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) {}

  // Get all pictures from backend
  getAllPictures(){
    return this.http.get<Picture[]>(this.photoUrl).pipe(
      map((response) =>
        response),
      catchError(this.handleError)
    );
  };

  // Send request to the backend with new userdata
  patchUser(id: number, data: any){
    return this.http.patch(this.userUrl + id, data);
  };

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
