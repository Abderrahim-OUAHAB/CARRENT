import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule,FormsModule,MatFormFieldModule,MatIcon,MatLabel,MatFormField,MatTableModule, MatProgressSpinnerModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: any[] = []; // Données initiales
  filteredBookings: any[] = []; // Données filtrées pour le tableau
  isSpinning = true; // État du spinner de chargement
  displayedColumns: string[] = [
    'username', 
    'email', 
    'fromDate', 
    'toDate', 
    'days', 
    'price', 
    'status', 
    'actions'
  ];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.isSpinning = true; // Afficher le spinner
    this.adminService.getBookings().subscribe(
      (data: any) => {
        this.bookings = data; // Assignation des données
        this.filteredBookings = data; // Initialiser les données filtrées
        this.isSpinning = false; // Arrêter le chargement
      },
      (error) => {
        console.error('Erreur lors de la récupération des réservations :', error);
        this.isSpinning = false; // Arrêter le chargement
        this.snackBar.open('Échec du chargement des réservations', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['notification-error'],
        });
      }
    );
  }

  // Appliquer le filtre sur la base de la saisie de l'utilisateur
// Ajoutez cette méthode dans BookingsComponent
// Ajoutez cette méthode dans BookingsComponent
applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase(); // Assertion de type
  this.filteredBookings = this.bookings.filter(booking => {
    return (
      booking.userName.toLowerCase().includes(filterValue) ||
      booking.email.toLowerCase().includes(filterValue) ||
      (booking.startDate && booking.startDate.toLowerCase().includes(filterValue)) ||
      (booking.endDate && booking.endDate.toLowerCase().includes(filterValue)) ||
      (booking.days && booking.days.toString().includes(filterValue)) ||
      (booking.price && booking.price.toString().includes(filterValue)) ||
      booking.status.toLowerCase().includes(filterValue)
    );
  });
}



  changeBookingStatus(id: any, status: string): void {
    this.isSpinning = true; // Afficher le spinner
    this.adminService.changeBookingStatus(id, status).subscribe(
      () => {
        this.isSpinning = false; // Arrêter le chargement
        this.getBookings(); // Rafraîchir les réservations
        this.snackBar.open('Statut de réservation mis à jour avec succès', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['notification-success'],
        });
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut de réservation :', error);
        this.isSpinning = false; // Arrêter le chargement
        this.snackBar.open('Échec de la mise à jour du statut', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['notification-error'],
        });
      }
    );
  }
}
