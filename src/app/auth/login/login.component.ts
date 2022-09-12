import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.getLoggedInStatus().pipe(
      filter(isLoggedIn => isLoggedIn === true)
    ).subscribe({
      next: () => {
        inject(Router).navigate(['/'])
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  login() {
    const value = this.form.value;

    this.auth.login(value.email, value.password).subscribe({
      next: () => {
        console.log('Login ok')
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}