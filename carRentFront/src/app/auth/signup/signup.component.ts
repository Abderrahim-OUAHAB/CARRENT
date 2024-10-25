import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Nécessaire pour les formulaires réactifs
import { MatInputModule } from '@angular/material/input'; // Pour les champs de texte
import { MatButtonModule } from '@angular/material/button'; // Pour les boutons
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router'; 
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]], // Nom d'utilisateur
      email: [null, [Validators.required, Validators.email]],
      tel: [null, [Validators.required, Validators.minLength(10)]], // Validation de l'email
      password: [null, [Validators.required, Validators.minLength(6)]], // Validation du mot de passe
      confirmPassword: [null, [Validators.required, this.confirmationValidator]], // Validation pour confirmation
    });
  }


  // Validation pour vérifier que le mot de passe et la confirmation correspondent
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // Méthode pour gérer l'enregistrement
  register() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      this.authService.register(this.signupForm.value).subscribe((res) => {
        console.log(res);
      })
       // Afficher un message de confirmation
       this.snackBar.open('Inscription réussie !', 'Fermer', {
        duration: 3000, // Durée d'affichage de la notification en ms
        verticalPosition: 'top', // Positionnement en haut
        horizontalPosition: 'right', // Positionnement à droite
        panelClass: ['notification-success'] // Classe personnalisée pour le style
      });
      this.router.navigate(['/login']);
    } else {
      // Afficher les erreurs de validation
      this.snackBar.open('Inscription faillée !', 'Fermer', {
        duration: 3000, // Durée d'affichage de la notification en ms
        verticalPosition: 'top', // Positionnement en haut
        horizontalPosition: 'right', // Positionnement à droite
        panelClass: ['notification-error'] // Classe personnalisée pour le style
      });
    }
  }
}
