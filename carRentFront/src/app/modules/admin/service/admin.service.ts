import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';

const URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  postCar(carDto: any) {
    // Créer les en-têtes d'autorisation
    const headers = this.createAuthorizationHeader();
    
    // Envoyer la requête POST avec le corps et les en-têtes
    return this.http.post(URL + '/api/admin/cars', carDto, { headers });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', 'Bearer ' + this.storageService.getToken());
  }

  getAllCars() {
    const headers = this.createAuthorizationHeader();
    return this.http.get(URL + '/api/admin/cars', { headers });
  }

  deleteCar(id: any) {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(URL + '/api/admin/cars/' + id, { headers });
  }

  getCarById(id: any) {
    const headers = this.createAuthorizationHeader();
    return this.http.get(URL + '/api/admin/cars/' + id, { headers });
  }

  updateCar(carDto: any, id: any) {
    const headers = this.createAuthorizationHeader();
    return this.http.put(URL + '/api/admin/cars/' + id, carDto, { headers });
  }

  getBookings(){
    const headers = this.createAuthorizationHeader();
    return this.http.get(URL + '/api/admin/cars/bookings', { headers });
  }

  changeBookingStatus(id: any, status: any) {
    const headers = this.createAuthorizationHeader();
    return this.http.get(URL + '/api/admin/cars/bookings/' + id+"/"+status, { headers });
  }
  searchCar(searchCarDto:any){
    const headers = this.createAuthorizationHeader();
    return this.http.post(URL + '/api/admin/cars/search', searchCarDto, { headers });
  }
}
