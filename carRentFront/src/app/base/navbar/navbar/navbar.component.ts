import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';  // Si vous ajoutez un menu
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { AdminService } from '../../../modules/admin/service/admin.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule,MatToolbarModule,MatButtonModule,MatIconModule,MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCustomerLoggedIn: boolean = false;  
  isAdminLoggedIn: boolean = false;
  username: string | undefined;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
  }

  updateLoginStatus(): void {
    this.isCustomerLoggedIn = this.storageService.isCustomerLoggedIn();
    this.isAdminLoggedIn = this.storageService.isAdminLoggedIn();
    const user = this.storageService.getUser();
    this.username = user ? user.username : 'Utilisateur';
    console.log('Utilisateur connecté:', user);
  }

  logout(): void {
    this.storageService.logout();
    this.router.navigate(['/login']);
  }
}
