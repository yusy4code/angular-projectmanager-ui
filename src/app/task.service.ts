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
  endTask(taskid: number): Observable<Task> {
    let updateUrl = "http://localhost:3000/tasks" + "/end/" + taskid;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.put<Task>(updateUrl, httpOptions);
  }
  getTasks() {
    return this.http.get("http://localhost:3000/tasks");
  }
  getTask(taskid: number) {
    return this.http.get("http://localhost:3000/tasks/" + taskid);
  }
  updateTask(task_id: number, updatedTask: Task): Observable<Task> {
    let updateUrl = "http://localhost:3000/tasks/" + task_id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.put<Task>(updateUrl, updatedTask, httpOptions);
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
