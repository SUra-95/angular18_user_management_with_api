import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  userService = inject(UserService);
  router = inject(Router);
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

  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      this.userService.deleteUserById(id).subscribe((res: any) => {
        if (res.result) {
          this.loadUsers();
        } else {
          alert(res.message);
        }
      });
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/edit-user', id]);
  }
}
