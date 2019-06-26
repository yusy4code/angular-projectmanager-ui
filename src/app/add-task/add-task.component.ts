import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"]
})
export class AddTaskComponent implements OnInit {
  taskId: number;
  projectTitle: String;
  projectManager: String;
  taskName: String;
  parentTask: String;
  priority: number;
  startDate: String;
  endDate: String;
  assignedTo: number;
  isCompleted: boolean;

  constructor() {}

  ngOnInit() {}
}
