import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../task.service";
import { FlashMessagesService } from "angular2-flash-messages";

import { Task } from "../task";
@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.css"]
})
export class EditTaskComponent implements OnInit {
  parentTask: string;
  assignedTo: string;
  endDate: string;
  isCompleted: boolean;
  priority: number;
  projectTitle: string;
  startDate: string;
  taskName: string;
  taskId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private flashMessage: FlashMessagesService
  ) {}

  onCancel() {
    this.router.navigate(["/tasks"]);
  }
  onTaskUpdate() {
    const updatedTask = {
      taskId: this.taskId,
      taskName: this.taskName,
      parentTask: this.parentTask,
      projectTitle: this.projectTitle,
      priority: this.priority,
      startDate: this.startDate,
      endDate: this.endDate,
      isCompleted: this.isCompleted,
      assignedTo: this.assignedTo
    };
    console.log(updatedTask);
    if (!this.taskService.validateTask(updatedTask)) {
      this.flashMessage.show("Fill in all mandatory details", {
        cssClass: "alert-danger",
        timeout: 3000
      });
    } else {
      this.taskService.updateTask(this.taskId, updatedTask).subscribe(data => {
        this.flashMessage.show("Task Updated Successfully", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["/tasks"]);
      });
    }
  }
  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    //this.taskService.getTask(id).subscribe(res => {
    //  console.log(res);
    //});
    this.taskService.getTask(id).subscribe(res => {
      if (res["success"]) {
        this.taskId = res["data"][0].taskId;
        this.projectTitle = res["data"][0].projectTitle;
        this.taskName = res["data"][0].taskName;
        this.startDate = res["data"][0].startDate.substring(0, 10);
        this.endDate = res["data"][0].endDate.substring(0, 10);
        this.assignedTo = res["data"][0].assignedTo;
        this.priority = res["data"][0].priority;
        this.parentTask = res["data"][0].parentTask;
        this.isCompleted = res["data"][0].isCompleted;
      }
    });
  }
}
