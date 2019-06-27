import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserService } from "../user.service";

import { User } from "../user";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  userId: number;
  firstName: String;
  lastName: String;
  employeeId: number;

  _userFilter: string;
  filteredUser: User[];

  editFlag: boolean = false;

  users: User[];
  get userFilter(): string {
    return this._userFilter;
  }
  set userFilter(value: string) {
    this._userFilter = value;
    this.filteredUser = this.userFilter
      ? this.performUserFilter(this.userFilter)
      : this.users;
    console.log(this.filteredUser);
  }
  performUserFilter(filterBy: string) {
    filterBy = filterBy.toLowerCase();
    //console.log(typeof this.projects);
    return this.users.filter((singleUser: User) => {
      return singleUser.firstName.toLowerCase().indexOf(filterBy) !== -1;
    });
  }
  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.onReset();
    this.userService.getUser().subscribe(response => {
      if (response["success"]) {
        this.users = <any>response["data"];
        this.filteredUser = this.users;
      }
    });
  }

  onEdit(edituser: User) {
    this.editFlag = true;
    this.userId = edituser.userId;
    this.firstName = edituser.firstName;
    this.lastName = edituser.lastName;
    this.employeeId = edituser.employeeId;
  }

  onUserSubmit() {
    const newUser = {
      userId: 0,
      firstName: this.firstName,
      lastName: this.lastName,
      employeeId: this.employeeId
    };

    if (!this.userService.validateUser(newUser)) {
      this.flashMessage.show("Fill in all mandatory fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
    } else {
      this.userService.addUser(newUser).subscribe(data => {
        //console.log(data);
        this.flashMessage.show("User Created Successfully", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.ngOnInit();
      });
    }
  }

  onUpdateUser(user) {
    const updateUser = {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      employeeId: this.employeeId
    };

    if (!this.userService.validateUser(updateUser)) {
      this.flashMessage.show("Fill in all mandatory fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
    } else {
      this.userService.updateUser(this.userId, updateUser).subscribe(data => {
        //console.log(data);
        this.flashMessage.show("User Updated Successfully", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.ngOnInit();
      });
    }
  }
  onDelete(user) {
    this.userService.removeUser(user.userId).subscribe(data => {
      console.log(data);
      this.flashMessage.show("User Deleted Successfully", {
        cssClass: "alert-success",
        timeout: 3000
      });
      this.ngOnInit();
    });
  }

  onReset() {
    this.editFlag = false;
    this.firstName = undefined;
    this.lastName = undefined;
    this.employeeId = undefined;
  }

  onCancel() {
    this.onReset();
  }
}
