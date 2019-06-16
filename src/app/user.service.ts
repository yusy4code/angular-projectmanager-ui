import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { User } from "./user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  validateUser(user) {
    if (
      user.firstName == undefined ||
      user.lastName == undefined ||
      user.employeeId == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  getUser() {
    return this.http.get("http://localhost:3000/users");
  }
  updateUser(user_id: number, userObj: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    let updateUrl = "http://localhost:3000/users/" + user_id;
    return this.http.put<User>(updateUrl, userObj, httpOptions);
  }
  removeUser(user_id: number) {
    let deleteUrl = "http://localhost:3000/users/" + user_id;
    return this.http.delete(deleteUrl);
  }
  addUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post<User>(
      "http://localhost:3000/users/new",
      user,
      httpOptions
    );
  }
}
