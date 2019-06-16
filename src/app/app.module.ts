import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FlashMessagesModule } from "angular2-flash-messages";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { ViewTasksComponent } from "./view-tasks/view-tasks.component";
import { AddProjectComponent } from "./add-project/add-project.component";
import { AddTaskComponent } from "./add-task/add-task.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AddUserComponent,
    ViewTasksComponent,
    AddProjectComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      {
        path: "welcome",
        component: WelcomeComponent
      },
      {
        path: "tasks",
        component: ViewTasksComponent
      },
      {
        path: "projects",
        component: AddProjectComponent
      },
      {
        path: "tasks/add",
        component: AddTaskComponent
      },
      {
        path: "users",
        component: AddUserComponent
      },
      { path: "", redirectTo: "welcome", pathMatch: "full" }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
