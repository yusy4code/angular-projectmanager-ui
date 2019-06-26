import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../project.service";
import { FlashMessagesService } from "angular2-flash-messages";

import { Project } from "../project";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"]
})
export class AddProjectComponent implements OnInit {
  projects: Project[];
  editProject: boolean = false;
  title: String;
  status: String;
  projectManager: String;
  startDate: String;
  endDate: String;
  priority: number;

  constructor(
    private projectService: ProjectService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.onReset();
    this.projectService.getProjects().subscribe(data => {
      this.projects = <any>data["data"];
    });
  }

  onAddProject() {
    const proj_obj = {
      projectId: 0,
      title: this.title,
      projectManager: this.projectManager,
      priority: this.priority,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status,
      noOfTask: 0
    };
    console.log(proj_obj);
    if (!this.projectService.validateProject(proj_obj)) {
      this.flashMessage.show("Fill in all mandatory fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
    } else {
      this.projectService.addProject(proj_obj).subscribe(data => {
        console.log(data);
        this.flashMessage.show("Project Added successfully", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.ngOnInit();
      });
    }
  }
  onUpdateProject() {
    this.editProject = false;
    console.log("Updated..");
  }
  onCancel() {
    console.log("Cancelled..");
    this.onReset();
    this.editProject = false;
  }
  onUpdateProjectClick(project) {
    this.editProject = true;
    this.title = project.title;
    this.startDate = project.startDate.substring(0, 10);
    this.endDate = project.endDate.substring(0, 10);
    this.priority = project.priority;
    this.projectManager = project.projectManager;
    console.log(project);
  }
  onReset() {
    this.editProject = false;
    this.title = undefined;
    this.status = undefined;
    this.projectManager = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.priority = undefined;
  }
}
