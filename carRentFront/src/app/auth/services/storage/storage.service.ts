import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, token);
    }
  }
  
  saveUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(USER);
      localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(TOKEN);
    }
    return null; // Handle the case when called on the server
  }

  getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(USER) || '{}');
    }
    return {}; // Handle the case when called on the server
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(USER) || '{}').role || null;
    }
    return null; // Handle the case when called on the server
  }

  isAdminLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem(USER) || '{}');
      return !!user && user.role === 'ADMIN';
    }
    return false; // Handle the case when called on the server
  }

  isCustomerLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem(USER) || '{}');
      return !!user && user.role === 'CUSTOMER';
    }
    return false; // Handle the case when called on the server
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);
    }
  }
}
