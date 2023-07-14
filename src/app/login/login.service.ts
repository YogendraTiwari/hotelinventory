import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  constructor() {}

  Login(email: string, password: string) {
    if (email === 'admin@gmail.com' && password === 'Admin') {
      //  this.router.navigate(['/rooms', 'add']);
      this.isLoggedIn = true;
      // } else {
      //  // alert('Invalid username or password');
      // }
    }
    return this.isLoggedIn;
  }
}
