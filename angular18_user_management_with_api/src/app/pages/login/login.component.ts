import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    "EmailId": "",
    "Password": ""
  };

  userService = inject(UserService)
  router = inject(Router);

  login() {
    this.userService.onLogin(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        localStorage.setItem("userApp", JSON.stringify(res.data));
        if (res.data.role === "User") {
          this.router.navigateByUrl('create-user');
        } else {
          this.router.navigateByUrl('user-list');
        }
      } else {
        alert(res.message);
      }
    })
  }
}
