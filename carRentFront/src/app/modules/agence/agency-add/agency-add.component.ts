import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/service/admin.service';
import { AgenceService } from '../service/agence.service';
 // Ensure you have your service to handle agency API requests

@Component({
  selector: 'app-agency-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './agency-add.component.html',
  styleUrls: ['./agency-add.component.scss']
})
export class AgencyAddComponent implements OnInit {
  agencyForm: FormGroup;
  imagePreview: ArrayBuffer|string | null = null;
  isSpinning: boolean = false; // To show loading indicator if needed
  selectedFile: File | null = null;
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private agenceService: AgenceService, private router: Router) {
    this.agencyForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Method to publish the agency
  addAgency() {
    this.isSpinning = true; // Start loading indicator
    if (this.agencyForm.valid) {
      const formData: FormData = new FormData();
        // Ajouter l'image si elle est sélectionnée
        if (this.selectedFile) {
          formData.append('img', this.selectedFile, this.selectedFile.name);
        }
      // Append form fields
      formData.append('name', this.agencyForm.get('name')?.value);
      formData.append('address', this.agencyForm.get('address')?.value);
      formData.append('city', this.agencyForm.get('city')?.value);
      formData.append('country', this.agencyForm.get('country')?.value);
      formData.append('email', this.agencyForm.get('email')?.value);
      formData.append('phoneNumber', this.agencyForm.get('phoneNumber')?.value);
      
   
      console.log(formData); // For debugging
      this.agenceService.createAgency(formData).subscribe(
        (res) => {
          this.isSpinning = false; // Stop loading indicator
          this.snackBar.open('Agency added successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['notification-success'],
          });
          console.log(res);
          this.router.navigate(['/admin/dashboard']); // Redirect to dashboard
        },
        (error) => {
          console.log(error);
          this.isSpinning = false; // Stop loading indicator
          this.snackBar.open('An error occurred!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['notification-error'],
          });
        }
      );
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['notification-error']
      });
    }
  }

   // Gestion de la sélection du fichier
   onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  // Prévisualisation de l'image sélectionnée
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.agencyForm.reset();
    this.imagePreview = null;
    this.selectedFile = null;
  }
}
