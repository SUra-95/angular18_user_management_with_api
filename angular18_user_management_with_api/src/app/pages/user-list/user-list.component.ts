import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  userService = inject(UserService);
  userList: any[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    if (this.userService.getUsers() != null) {
      const users = this.userService.getUsers();
      console.log(users);

      if (users && typeof users.subscribe === 'function') {
        users.subscribe((res: any) => {
          this.userList = res.data;
        });
      }
    }
  }
}
