import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
const URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private storageService: StorageService) { }


  createAuthorizationHeader(): HttpHeaders {
    let authHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', 'Bearer ' + this.storageService.getToken());
  }

  getAllCars() {
    const headers = this.createAuthorizationHeader();
    return this.http.get(URL + '/api/customer/cars', { headers });
  }

  getCarById(id: any) {
    const headers = this.createAuthorizationHeader();
    return this.http.get(URL + '/api/customer/cars/' + id, { headers });
  }

  bookCar(bookCarDto: any) {
    const headers = this.createAuthorizationHeader();
    return this.http.post(URL + '/api/customer/cars/book', bookCarDto, { headers });
  }

  getBookingsById() {
    const headers = this.createAuthorizationHeader();
    return this.http.get(URL + '/api/customer/cars/bookings/' + this.storageService.getUser().id, { headers });
  }
  searchCar(searchCarDto:any){
    const headers = this.createAuthorizationHeader();
    return this.http.post(URL + '/api/customer/cars/search', searchCarDto, { headers });
  }

  cancelBooking(bookingId: any,status:any) {
    const headers = this.createAuthorizationHeader();
    return this.http.get(URL + '/api/customer/cars/cancel/' + bookingId+"/"+status, { headers });
  }

  updateUser(id: any, userDto: any) {
    const headers = this.createAuthorizationHeader();
    return this.http.put(URL + '/api/customer/' + id, userDto, { headers });
  }
}
