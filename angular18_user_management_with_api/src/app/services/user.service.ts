import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  onLogin(obj: any) {
    return this.http.post("https://projectapi.gerasim.in/api/UserApp/login", obj)
  }

  getUsers() {
    const userApp = JSON.parse(localStorage.getItem('userApp') || '{}');
    const token = userApp.token;

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get("https://projectapi.gerasim.in/api/UserApp/GetAllUsers", { headers });
    } else {
      console.error('No token found');
      return null;
    }
  }

  createNewUser(obj: any) {
    return this.http.post("https://projectapi.gerasim.in/api/UserApp/CreateUser", obj)
  }

  deleteUserById(userId: number) {
    return this.http.delete("https://freeapi.gerasim.in/api/User/DeleteUserById?id=" + userId);
  }

  getUserById(id: number) {
    return this.http.get("https://projectapi.gerasim.in/api/UserApp/DeleteUserById?id=" + id);
  }

  updateUser(obj: any) {
    return this.http.put("https://projectapi.gerasim.in/api/UserApp/u[dateeUser", obj)
  }
}
