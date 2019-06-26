import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { Project } from "./project";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  projects: Project[] = [
    {
      title: "Project1",
      projectManager:"Yusuf",
      projectId:1,
      startDate: "2019-01-01",
      endDate: "2019-02-01",
      priority: 10,
      status: "In progress",
      noOfTask: 2
    }
  ];
  validateProject(project: Project) {
    if (
      project.title == undefined ||
      project.projectManager == undefined ||
      project.startDate == undefined ||
      project.endDate == undefined ||
      project.priority == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }
  getProjects() {
    return this.http.get("http://localhost:3000/projects");
  }
  addProject(project: Project): Observable<Project> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post<Project>(
      "http://localhost:3000/projects/new",
      project,
      httpOptions
    );
  }
}
