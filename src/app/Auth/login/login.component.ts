import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('user1', [Validators.required]),
      password: new FormControl('Hi@123', [Validators.required]),
    });
  }
  login() {
    this.authService.login(this.loginForm.value).subscribe(val => {
      console.log(val);
    });
  }
}
