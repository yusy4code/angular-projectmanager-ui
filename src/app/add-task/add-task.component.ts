import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

import { Task } from "../task";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"]
})
export class AddTaskComponent implements OnInit {
  taskId: number;
  projectTitle: String;
  //projectManager: String;
  taskName: String;
  parentTask: String;
  priority: number;
  startDate: String;
  endDate: String;
  assignedTo: String;
  isCompleted: boolean;

  constructor(
    private flashMessage: FlashMessagesService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onReset();
  }

  onReset() {
    this.projectTitle = undefined;
    this.taskName = undefined;
    this.parentTask = undefined;
    this.priority = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.assignedTo = undefined;
  }
  onTaskSubmit() {
    const new_task = {
      taskId: 0,
      projectTitle: this.projectTitle,
      taskName: this.taskName,
      parentTask: this.parentTask,
      priority: this.priority,
      startDate: this.startDate,
      endDate: this.endDate,
      assignedTo: this.assignedTo,
      isCompleted: false
    };
    console.log(new_task);
    if (!this.taskService.validateTask(new_task)) {
      this.flashMessage.show("Fill in all mandatory fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
    } else {
      this.taskService.addTask(new_task).subscribe(data => {
        //console.log(data);
        this.flashMessage.show("Task Created Successfully", {
          cssClass: "alert-success",
          timeout: 3000
        });
        //this.ngOnInit();
        this.router.navigate(["/tasks"]);
      });
    }
  }
}
