import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = ['http://localhost:8080'];
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  register(signupRequest: any) {
    return this.http.post(URL + '/api/auth/signup', signupRequest);
  }

  login(loginRequest: any) {
    return this.http.post(URL + '/api/auth/login', loginRequest);
  }

  getUserById(id: any) {
    return this.http.get(URL + '/api/auth/user/' + id);
  }
}
