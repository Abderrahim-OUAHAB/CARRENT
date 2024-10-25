import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent implements OnInit{
  bookings: any[] = []; // Initialize as an empty array
  isSpinning = true; // Loading indicator state
  displayedColumns: string[] = [
    'username', 
    'email', 
    'fromDate', 
    'toDate', 
    'days', 
    'price', 
    'status' ,
  'actions'];
  constructor(private customerService: CustomerService,private snackBar : MatSnackBar) {}

  ngOnInit(): void {
    this.getBookingsById();
  }

  getBookingsById(): void {
    this.customerService.getBookingsById().subscribe((data: any) => {

      this.bookings = data; // Assign the fetched data
      this.isSpinning = false; // Stop loading indicators
      console.log(this.bookings);
    }, (error) => {
      console.error('Error fetching bookings:', error);
      this.isSpinning = false; // Stop loading on error
    });
  }
  cancelBooking(bookingId: any,status:any): void {
    this.customerService.cancelBooking(bookingId,status).subscribe({
      next: () => {
        this.snackBar.open('Réservation annulée avec succès', 'Fermer', {
          duration: 3000,
        });
        this.getBookingsById(); // Rafraîchir la liste après l'annulation
      },
      error: (err) => {
        this.snackBar.open('Erreur lors de l\'annulation', 'Fermer', {
          duration: 3000,
        });
        console.log(err);
      }
    });
  }
}
