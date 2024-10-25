import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminService } from '../service/admin.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { AgenceService } from '../../agence/service/agence.service';
@Component({
  selector: 'app-post-car',
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
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss'],
})
export class PostCarComponent implements OnInit {
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null | undefined=null;
  imagePreview: string | ArrayBuffer | null | undefined=null;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = [
    "BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", 
    "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"
  ];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  agencies: any[] = []; 
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService:AdminService,
    private router: Router,
    private agencyService:AgenceService
    ) {
  }
  ngOnInit(): void {
   this.postCarForm = this.fb.group({
     name: ['', [Validators.required]],
     brand: ['', [Validators.required]],
     type: ['', [Validators.required]],
     color: ['', [Validators.required]],
     transmission: ['', [Validators.required]],
     price: ['', [Validators.required]],
     description: ['', [Validators.required]],
     year: ['', [Validators.required]],
     agencyId: ['', Validators.required]
   });


   this.agencyService.getAllAgencies().subscribe((data: any) => {
    this.agencies = data;
  });
  }
  postCar() {
    this.isSpinning = true;
    if (this.postCarForm.valid) {
      const formData: FormData = new FormData();
      
      // Handle file upload
      if (this.selectedFile) {
        formData.append('img', this.selectedFile, this.selectedFile.name); 
      }
      
      // Append form fields
      formData.append('brand', this.postCarForm.get('brand')?.value);
      formData.append('name', this.postCarForm.get('name')?.value);
      formData.append('type', this.postCarForm.get('type')?.value);
      formData.append('color', this.postCarForm.get('color')?.value);
      
      // Assuming `year` is a Date object; format it to YYYY-MM-DD
      const selectedYear: Date = this.postCarForm.get('year')?.value;
      if (selectedYear) {
        const yearString: string = selectedYear.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
        formData.append('year', yearString);
      }
      
      formData.append('transmission', this.postCarForm.get('transmission')?.value);
      formData.append('description', this.postCarForm.get('description')?.value);
      formData.append('price', this.postCarForm.get('price')?.value);
      const agencyId = this.postCarForm.get('agencyId')?.value;
      formData.append('agencyId', agencyId.toString());  
      console.log(formData);
      this.adminService.postCar(formData).subscribe((res) => {
        this.isSpinning = false;
        this.snackBar.open('Car added successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['notification-success'],
        });
        console.log(res);
        this.router.navigate(['/admin/dashboard']);
      }, error => {
        console.log(error);
        this.snackBar.open('An error occurred!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['notification-error'],
        });
      });
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['notification-error']
      });
    }
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }
}
