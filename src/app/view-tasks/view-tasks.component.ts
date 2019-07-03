import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { FlashMessagesService } from "angular2-flash-messages";

import { Task } from "../task";

@Component({
  selector: "app-view-tasks",
  templateUrl: "./view-tasks.component.html",
  styleUrls: ["./view-tasks.component.css"]
})
export class ViewTasksComponent implements OnInit {
  tasks: Task[];
  _taskFilter: string;
  filteredTask: Task[];
  sortedTask: Task[];

  constructor(
    private flashMessage: FlashMessagesService,
    private taskService: TaskService
  ) {}

  get taskFilter(): string {
    return this._taskFilter;
  }
  set taskFilter(value: string) {
    this._taskFilter = value;
    this.filteredTask = this.taskFilter
      ? this.performTaskFilter(this.taskFilter)
      : this.tasks;
  }
  performTaskFilter(filterBy: string) {
    filterBy = filterBy.toLowerCase();
    return this.tasks.filter((singleTask: Task) => {
      return singleTask.taskName.toLowerCase().indexOf(filterBy) !== -1;
    });
  }
  sortBy(value: string) {
    this.sortedTask = this.filteredTask;
    if (value === "priority") {
      this.filteredTask = this.sortedTask.sort(this.sortPriority);
    } else if (value === "status") {
      this.filteredTask = this.sortedTask.sort(this.sortStatus);
    } else if (value === "start_date") {
      this.filteredTask = this.sortedTask.sort(this.sortStartDate);
    } else if (value === "end_date") {
      this.filteredTask = this.sortedTask.sort(this.sortEndDate);
    }
  }
  sortStatus(t1: Task, t2: Task) {
    return Number(t2.isCompleted) - Number(t1.isCompleted);
  }
  sortPriority(t1: Task, t2: Task) {
    return t1.priority - t2.priority;
  }
  sortStartDate(t1: Task, t2: Task) {
    return new Date(t2.startDate).getTime() - new Date(t1.startDate).getTime();
  }
  sortEndDate(t1: Task, t2: Task) {
    return new Date(t2.endDate).getTime() - new Date(t1.endDate).getTime();
  }
  onEndTask(id) {
    this.taskService.endTask(id).subscribe(data => {
      console.log(data);
      this.flashMessage.show("Task Ended Successfully", {
        cssClass: "alert-success",
        timeout: 3000
      });
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(response => {
      if (response["success"]) {
        this.tasks = <any>response["data"];
        this.filteredTask = this.tasks;
        this.sortedTask = this.tasks;
      }
    });
  }
}
