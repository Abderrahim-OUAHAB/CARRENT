import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin/service/admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CustomerService } from '../service/customer.service';
import { RouterModule } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-car-customer',
  standalone: true,
  imports: [CommonModule,RouterModule,MatProgressSpinner,MatCardModule,ReactiveFormsModule , MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './search-car-customer.component.html',
  styleUrl: './search-car-customer.component.scss'
})
export class SearchCarCustomerComponent {
  searchForm!:FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = [
    "BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", 
    "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"
  ];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  cars: any;
  isSpinning:boolean=false;
  constructor(private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private customerService:CustomerService
  ) {
    this.searchForm = this.fb.group({
      brand: [''],
      color: [''],
      type: [''],
      transmission: [''],
      disponible: [''] 

    })
   }
  ngOnInit(): void {
  
  }
  onSearch() {
    this.isSpinning=true;
    this.customerService.searchCar(this.searchForm.value).subscribe((res: any) => {
      this.isSpinning=false;
      console.log(res);
  
      // Handle the response and map the car list
      if (res && Array.isArray(res.carDtoList)) {
        this.cars = res.carDtoList.map((car: any) => ({
          ...car,
          processedImg: `data:image/jpg;base64,${car.returnedImage}`,
        }));
      } else {
        this.cars = []; // No cars found or wrong response structure
      }
  
      const message = this.cars.length > 0 ? 
        `${this.cars.length} car(s) found!` : 'No cars found!';
        
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['notification-success'],
      });
    });
  }
  
}
