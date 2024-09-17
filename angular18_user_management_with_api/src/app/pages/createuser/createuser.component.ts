import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css'
})
export class CreateuserComponent {
  userObj: any = {
    "userId": 0,
    "emailId": "string",
    "fullName": "string",
    "password": "string"
  };

  loggeduserId: number = 0;
  userService = inject(UserService)
  activatedRoute = inject(ActivatedRoute)
  currentId: number = 0;

  constructor() {
    const loggedUser = localStorage.getItem('userApp');
    if (loggedUser) {
      const parseData = JSON.parse(loggedUser);
      if (parseData.role == "User") {
        this.loggeduserId = parseData.userId;
        this.getUserById(this.loggeduserId);
      }
    }
    this.activatedRoute.params.subscribe((res: any) => {
      this.currentId = res.data;
      this.getUserById(this.currentId);
    })
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe((res: any) => {
      this.userObj = res.data;
    })
  }

  onSave() {
    this.userService.createNewUser(this.userObj).subscribe((res: any) => {
      if (res.result) {
        alert("User created Successfully");
      } else {
        alert(res.message);
      }
    })
  }
  onUpdate() {
    this.userService.updateUser(this.userObj).subscribe((res: any) => {
      if (res.result) {
        alert("User updated Successfully");
      } else {
        alert(res.message);
      }
    })
  }
}
