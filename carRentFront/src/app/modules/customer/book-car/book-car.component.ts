import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [CommonModule,MatDatepickerModule,ReactiveFormsModule,MatInputModule,MatNativeDateModule,MatButtonModule,MatCardModule,MatGridListModule,MatPaginatorModule,RouterModule],
  providers: [DatePipe],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent implements OnInit {
  carId: any;
  car: any ;
  processedImg: any;
  validateForm!: FormGroup;
  constructor(private activateRoute: ActivatedRoute,
    private customerService : CustomerService,
    private  fb:FormBuilder,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    private datePipe: DatePipe,
    private route: Router
  ) {
  }
  ngOnInit(): void {
   this.carId=this.activateRoute.snapshot.params['id'];
   this.getCarById(this.carId);
   this.validateForm = this.fb.group({
     startDate: ['', [Validators.required]],
     endDate: ['', [Validators.required]]
   })
  }

  getCarById(id: any) {
    this.customerService.getCarById(id).subscribe((data: any) => {
      this.processedImg=`data:image/jpg;base64,${data.returnedImage}`;
      this.car=data
      console.log(data)
    })
  }

  /**
   * Sends a booking request to the server for the currently selected car.
   * @param data The booking data, including start and end dates.
   */
  bookCar() {
    if (this.validateForm.valid) {
      const rawStartDate = this.validateForm.value.startDate;
      const rawEndDate = this.validateForm.value.endDate;
  
      console.log('Raw Start Date:', rawStartDate);
      console.log('Raw End Date:', rawEndDate);
  
      // Transform to yyyy-MM-dd format
      const startDate = this.datePipe.transform(rawStartDate, 'yyyy-MM-dd');
      const endDate = this.datePipe.transform(rawEndDate, 'yyyy-MM-dd');
  
      console.log('Formatted Start Date:', startDate);
      console.log('Formatted End Date:', endDate);
  
      // Prepare booking data
      const bookingData = {
        carId: this.carId,
        userId: this.storageService.getUser().id,
        startDate: startDate,
        endDate: endDate
      };
  
      this.customerService.bookCar(bookingData).subscribe((response: any) => {
        // Show success message
        this.route.navigate(['/customer/dashboard']);

        this.snackBar.open('Car booked successfully!', 'Close', { duration: 3000 });
      }, (error) => {
        // Show error message
        this.snackBar.open('Booking failed. Please try again.', 'Close', { duration: 3000 });
      });
    } else {
      // Optionally show a validation error message
      this.snackBar.open('Please fill in the required fields.', 'Close', { duration: 3000 });
    }
  }

}
