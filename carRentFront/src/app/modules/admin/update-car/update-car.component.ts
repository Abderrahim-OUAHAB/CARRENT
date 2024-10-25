import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgenceService } from '../../agence/service/agence.service';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {
  carId: any;
  existingImg: string | null = null;
  updateForm!: FormGroup;
  imgChanged: boolean = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null | undefined = null;
  isSpinning: boolean = false;
  agencies: any[] = []; // Array to hold agencies

  listOfBrands = [
    "BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", 
    "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"
  ];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(
    private activateRoute: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private agencyService: AgenceService // Inject the AgenceService
  ) {}

  ngOnInit(): void {
    this.carId = this.activateRoute.snapshot.params['id'];
    this.updateForm = this.fb.group({
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      type: ['', [Validators.required]],
      color: ['', [Validators.required]],
      transmission: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discription: ['', [Validators.required]],  // Fixed spelling
      year: ['', [Validators.required]],
      agencyId: ['', Validators.required] // Added agencyId
    });
    this.getCarById(this.carId);
    this.getAgencies(); // Fetch the agencies on component init
  }

  getAgencies() {
    this.agencyService.getAllAgencies().subscribe((data: any) => {
      this.agencies = data; // Populate the agencies array
    }, error => {
      console.error('Error fetching agencies:', error);
      this.snackBar.open('Failed to load agencies.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['notification-error']
      });
    });
  }

  getCarById(id: any) {
    this.isSpinning = true;
    this.adminService.getCarById(id).subscribe((res: any) => {
      this.isSpinning = false;
      const carDto = res;
      this.existingImg = `data:image/jpg;base64,${carDto.returnedImage}`;
      console.log(carDto);
      this.updateForm.patchValue({
        ...carDto,
        year: this.formatDate(carDto.year) // Format date to YYYY-MM-DD for the input field
      });
    }, error => {
      console.error('Error fetching car data:', error);
      this.isSpinning = false;
      this.snackBar.open('Failed to load car details.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['notification-error']
      });
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  updateCar() {
    this.isSpinning = true;
    if (this.updateForm.valid) {
      const formData: FormData = new FormData();
      if (this.selectedFile && this.imgChanged) {
          formData.append('img', this.selectedFile, this.selectedFile.name); 
      }

      // Prepare other fields, converting the year to a string formatted as YYYY-MM-DD
      Object.keys(this.updateForm.value).forEach(key => {
          if (key === 'year') {
              const yearValue = new Date(this.updateForm.get(key)?.value);
              formData.append(key, yearValue.toLocaleDateString('en-CA')); // Format as YYYY-MM-DD
          } else {
              formData.append(key, this.updateForm.get(key)?.value);
          }
      });

      console.log(formData);
      this.adminService.updateCar(formData, this.carId).subscribe((res) => {
          this.isSpinning = false;
          this.snackBar.open('Car updated successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['notification-success'],
          });
          console.log(res);
          this.router.navigate(['/admin/dashboard']);
      }, error => {
          console.error('Error updating car:', error);
          this.isSpinning = false;
          this.snackBar.open('An error occurred!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['notification-error'],
          });
      });
    } else {
        this.snackBar.open('Please fill in all required fields.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['notification-error']
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImg = null;
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
