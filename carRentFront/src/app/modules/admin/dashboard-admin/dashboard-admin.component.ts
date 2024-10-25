import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SearchCarComponent } from "../search-car/search-car.component";
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    SearchCarComponent,
    MatProgressSpinner
],
})
export class DashboardAdminComponent implements OnInit {
  cars: any[] = [];
  pagedCars: any[] = [];
  pageSize: number = 6;
  isSpinning = true;
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
  constructor(private adminService: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(): void {
    this.isSpinning = true; 
    this.adminService.getAllCars().subscribe((res: any) => {
      this.isSpinning = false;
      console.log(res); 
      this.cars = res.map((car: any) => ({
        ...car,
        processedImg: `data:image/jpg;base64,${car.returnedImage}`,
      }));
      this.setPagedCars(0); // Initial pagination
    });
  }

  deleteCar(id: any): void {
    this.adminService.deleteCar(id).subscribe(() => {
      this.getAllCars();
      this.setPagedCars(0); // Update the displayed cars after deletion
      this.snackBar.open('Voiture supprimée avec succès', 'Fermer', {
        duration: 5000,

        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['notification-success']
      });
    });
  }

  setPagedCars(pageIndex: number): void {
    const start = pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedCars = this.cars.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.setPagedCars(event.pageIndex);
  }
}
