import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AdminService } from '../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [CommonModule,MatProgressSpinner,RouterModule,MatSnackBarModule,MatCardModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent implements OnInit {
  searchForm!:FormGroup;
  isSpinning:boolean=false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = [
    "BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", 
    "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"
  ];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  cars: any;
  constructor(private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private adminService:AdminService
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
    this.isSpinning = true;
    this.adminService.searchCar(this.searchForm.value).subscribe((res: any) => {
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
  deleteCar(id: any): void {
    this.adminService.deleteCar(id).subscribe(() => {
      this.getAllCars();

      this.snackBar.open('Voiture supprimée avec succès', 'Fermer', {
        duration: 5000,

        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['notification-success']
      });
    });
  }
  getAllCars(): void {
   
    this.adminService.getAllCars().subscribe((res: any) => {
     
      this.cars = res.map((car: any) => ({
        ...car,
        processedImg: `data:image/jpg;base64,${car.returnedImage}`,
      }));
 
    });
  }

}
