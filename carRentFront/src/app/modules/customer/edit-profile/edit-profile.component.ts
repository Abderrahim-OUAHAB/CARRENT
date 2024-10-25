import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../service/customer.service';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    private customerService: CustomerService,
    private route :Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with validators
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.minLength(6)]], // Optional, for changing password
      confirmPassword: ['', [this.confirmationValidator]] // Password confirmation
    });

    // Load current user profile information
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = this.storageService.getUser().id; 
    this.authService.getUserById(userId).subscribe(user => {
      console.log(user); 
      this.profileForm.patchValue(user); 
    }, error => {
      this.snackBar.open('Erreur de chargement des données utilisateur.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    });
  }

  confirmationValidator = (control: FormControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.profileForm?.get('password')?.value) {
      return { confirm: true, error: true };
    }
    return null;
  };

  updateProfile(): void {
    if (this.profileForm.valid) {
      const userId = this.storageService.getUser().id;
      this.customerService.updateUser(userId, this.profileForm.value).subscribe(() => {
        this.snackBar.open('Profil mis à jour avec succès!', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });

        this.route.navigate(['/login']);
        
      }, error => {
        this.snackBar.open('Échec de la mise à jour du profil!', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      });
    } else {
      this.snackBar.open('Veuillez corriger les erreurs dans le formulaire.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
  }
}
