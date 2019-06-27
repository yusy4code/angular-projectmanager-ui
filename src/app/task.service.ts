import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { Task } from "./task";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private http: HttpClient) {}

  validateTask(task) {
    if (
      task.projectTitle == undefined ||
      task.taskName == undefined ||
      task.startDate == undefined ||
      task.endDate == undefined ||
      task.priority == undefined ||
      task.assignedTo == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  addTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post<Task>(
      "http://localhost:3000/tasks/new",
      task,
      httpOptions
    );
  }
}
