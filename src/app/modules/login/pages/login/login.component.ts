import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { StorageKeys } from 'src/app/core/enums/storage-keys.enum';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  showErrorMessage(field: string): boolean {
    return (
      this.loginForm.get(field).invalid && this.loginForm.get(field).touched
    );
  }

  authenticateUser(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const user = this.loginForm.value;

    this.authenticationService.authenticate(user).subscribe((res) => {
      this.storageService.setItem(
        StorageKeys.TOKEN,
        res.headers.get('Authorization')
      );
      this.router.navigateByUrl('/users');
    });
  }
}
