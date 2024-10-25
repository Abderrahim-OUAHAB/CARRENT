import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]], // Email validation
      password: [null, [Validators.required, Validators.minLength(6)]], // Password validation
    });
  }

  // Method for login
  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe(
        (res:any) => {
          if(res.userId != null) {
            const user={
              id:res.userId,
              role:res.role,
              username:res.username
            }
            this.storageService.saveToken(res.jwt);
            this.storageService.saveUser(user);
            if(this.storageService.isAdminLoggedIn()) {
              this.router.navigate(['/admin/dashboard']);
            } else if(this.storageService.isCustomerLoggedIn()) {
              this.router.navigate(['/customer/dashboard']);
            }
          }
          console.log(res);
          this.snackBar.open('Connexion réussie !', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['notification-success'],
          });
       
        },
        (err) => {
          this.snackBar.open('Échec de la connexion !', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['notification-error'],
          });
        }
      );
    } else {
      this.snackBar.open('Vérifiez vos informations de connexion', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['notification-error'],
      });
    }
  }
}
