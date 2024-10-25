import { Component } from '@angular/core';
import { AgenceService } from '../service/agence.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-agency-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss'],
})
export class AgencyListComponent {
  agencies: any[] = [];
  pagedAgencies: any[] = [];
  pageSize = 6;
  isSpinning = false;

  constructor(private agencyService: AgenceService) {}

  ngOnInit(): void {
    this.loadAgencies();
  }

  loadAgencies() {
    this.isSpinning = true;
    this.agencyService.getAllAgencies().subscribe((data: any) => {
      console.log(data);
      // Attach the processed Base64 image to each agency object
      this.agencies = data.map((agency: { image: any; }) => ({
        ...agency,
        processedImg: `data:image/jpeg;base64,${agency.image}`,
      }));
      this.pagedAgencies = this.agencies.slice(0, this.pageSize);
      this.isSpinning = false;
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedAgencies = this.agencies.slice(startIndex, endIndex);
  }

  deleteAgency(id: number) {
    this.agencyService.deleteAgency(id).subscribe(() => {
      this.loadAgencies();
    });
  }
}
