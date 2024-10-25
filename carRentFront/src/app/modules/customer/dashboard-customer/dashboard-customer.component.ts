import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-dashboard-customer',
  standalone: true,
  imports: [CommonModule,MatIcon,MatProgressSpinner,MatButtonModule, MatCardModule, MatGridListModule, MatPaginatorModule, RouterModule],
  templateUrl: './dashboard-customer.component.html',
  styleUrl: './dashboard-customer.component.scss'
})
export class DashboardCustomerComponent implements OnInit {
  cars: any[] = [];
  pagedCars: any[] = [];
  pageSize: number = 6;
  isSpinning: boolean = true;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(): void {
    this.isSpinning = true;
    this.customerService.getAllCars().subscribe((res: any) => {
      this.isSpinning = false;
      this.cars = res.map((car: any) => ({
        ...car,
        processedImg: `data:image/jpg;base64,${car.returnedImage}`,
      }));
      this.setPagedCars(0); // Initial pagination
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

  applyFilter(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value; // Obtenir la valeur de l'input
    const filteredCars = this.cars.filter(car => {
      return (
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.transmission.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    this.pagedCars = filteredCars.slice(0, this.pageSize); // Reset to the first page of results
}

}
