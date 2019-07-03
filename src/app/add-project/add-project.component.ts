import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../project.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserService } from "../user.service";

import { Project } from "../project";
import { User } from "../user";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"]
})
export class AddProjectComponent implements OnInit {
  projects: Project[];
  filteredProject: Project[];
  sortedProject: Project[];
  users: User[];

  editProject: boolean = false;
  projectId: number;
  title: String;
  status: String;
  projectManager: String;
  startDate: String;
  endDate: String;
  priority: number;
  noOfTask: number;
  _projectFilter: string;

  get projectFilter(): string {
    return this._projectFilter;
  }
  set projectFilter(value: string) {
    this._projectFilter = value;
    this.filteredProject = this.projectFilter
      ? this.performTaskFilter(this.projectFilter)
      : this.projects;
  }
  performTaskFilter(filterBy: string) {
    console.log(this.projects);
    filterBy = filterBy.toLowerCase();
    console.log(typeof this.projects);
    return this.projects.filter((singleProject: Project) => {
      console.log(singleProject.title.toLowerCase());
      return singleProject.title.toLowerCase().indexOf(filterBy) !== -1;
    });
  }

  constructor(
    private projectService: ProjectService,
    private flashMessage: FlashMessagesService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.onReset();
    this.projectService.getProjects().subscribe(data => {
      this.projects = <any>data["data"];
      this.filteredProject = this.projects;
      this.sortedProject = this.projects;
    });
    this.userService.getUser().subscribe(response => {
      if (response["success"]) {
        this.users = <any>response["data"];
      }
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
    const proj_obj = {
      projectId: this.projectId,
      title: this.title,
      projectManager: this.projectManager,
      priority: this.priority,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status,
      noOfTask: this.noOfTask
    };
    console.log("Before update sent ");
    console.log(proj_obj);
    if (!this.projectService.validateProject(proj_obj)) {
      this.flashMessage.show("Fill in all mandatory fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
    } else {
      this.projectService
        .updateProject(this.projectId, proj_obj)
        .subscribe(data => {
          console.log(data);
          this.flashMessage.show("Project Updated successfully", {
            cssClass: "alert-success",
            timeout: 3000
          });
          this.ngOnInit();
        });
    }
  }
  onCancel() {
    console.log("Cancelled..");
    this.onReset();
    this.editProject = false;
  }
  onSuspend(project) {
    this.projectService.suspendProject(project.projectId).subscribe(data => {
      console.log(data);
      this.flashMessage.show("Project Suspended successfully", {
        cssClass: "alert-success",
        timeout: 3000
      });
      this.ngOnInit();
    });
  }
  onUpdateProjectClick(project) {
    this.editProject = true;
    this.projectId = project.projectId;
    this.title = project.title;
    this.startDate = project.startDate.substring(0, 10);
    this.endDate = project.endDate.substring(0, 10);
    this.priority = project.priority;
    this.projectManager = project.projectManager;
    this.noOfTask = project.noOfTask;
    this.status = project.status;
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

  // Sorting functions

  sortBy(value: string) {
    this.sortedProject = this.filteredProject;
    if (value === "priority") {
      this.filteredProject = this.sortedProject.sort(this.sortPriority);
    } else if (value === "status") {
      this.filteredProject = this.sortedProject.sort(this.sortStatus);
    } else if (value === "start_date") {
      this.filteredProject = this.sortedProject.sort(this.sortStartDate);
    } else if (value === "end_date") {
      this.filteredProject = this.sortedProject.sort(this.sortEndDate);
    }
  }
  sortStatus(p1: Project, p2: Project) {
    if (p1.status < p2.status) {
      return -1;
    }
    if (p1.status > p2.status) {
      return 1;
    }
    return 0;
  }
  sortPriority(p1: Project, p2: Project) {
    return p1.priority - p2.priority;
  }
  sortStartDate(p1: Project, p2: Project) {
    if (p1.startDate < p2.startDate) {
      return -1;
    }
    if (p1.startDate > p2.startDate) {
      return 1;
    }
    return 0;
  }
  sortEndDate(p1: Project, p2: Project) {
    if (p1.endDate < p2.endDate) {
      return -1;
    }
    if (p1.endDate > p2.endDate) {
      return 1;
    }
    return 0;
  }
}
