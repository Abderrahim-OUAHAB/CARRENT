import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgenceService } from '../service/agence.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-agency',
  templateUrl: './agency-update.component.html',
  styleUrls: ['./agency-update.component.scss'],
  standalone: true,
  imports: [
    
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ]
})
export class AgencyUpdateComponent implements OnInit {
  agencyId: any;
  existingImg: string | null = null;
  updateForm!: FormGroup;
  imgChanged: boolean = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null | undefined = null;
  isSpinning: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private agenceService: AgenceService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agencyId = this.activateRoute.snapshot.params['id'];
    this.updateForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
    this.getAgencyById(this.agencyId);
  }

  getAgencyById(id: any) {
    this.isSpinning = true;
    this.agenceService.getAgencyById(id).subscribe(
      (res: any) => {
        this.isSpinning = false;
        const agencyDto = res;
        this.existingImg = `data:image/jpg;base64,${agencyDto.image}`;
        this.updateForm.patchValue(agencyDto);
      },
      (error) => {
        console.error('Error fetching agency data:', error);
        this.isSpinning = false;
        this.snackBar.open('Failed to load agency details.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['notification-error']
        });
      }
    );
  }

  updateAgency() {
    this.isSpinning = true;
    if (this.updateForm.valid) {
      const formData: FormData = new FormData();
      if (this.selectedFile && this.imgChanged) {
        formData.append('img', this.selectedFile, this.selectedFile.name);
      }

      Object.keys(this.updateForm.value).forEach((key) => {
        formData.append(key, this.updateForm.get(key)?.value);
      });

      this.agenceService.updateAgency(this.agencyId,formData).subscribe(
        (res) => {
          this.isSpinning = false;
          this.snackBar.open('Agency updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['notification-success']
          });
          this.router.navigate(['/agences']);
        },
        (error) => {
          console.error('Error updating agency:', error);
          this.isSpinning = false;
          this.snackBar.open('An error occurred!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['notification-error']
          });
        }
      );
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
