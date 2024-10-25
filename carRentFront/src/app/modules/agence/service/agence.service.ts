import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';

const URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  constructor(private http: HttpClient, private storageService: StorageService) {}

  // Crée l'en-tête d'authentification avec le token
  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', 'Bearer ' + this.storageService.getToken());
  }

  // Récupérer toutes les agences
  getAllAgencies() {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${URL}/api/agencies`, { headers });
  }

  // Récupérer une agence par ID
  getAgencyById(id: number) {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${URL}/api/agencies/${id}`, { headers });
  }

  // Créer une nouvelle agence
  createAgency(agency: any) {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${URL}/api/agencies`, agency, { headers });
  }

  // Mettre à jour une agence existante
  updateAgency(id: number, agency: any) {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${URL}/api/agencies/${id}`, agency, { headers });
  }

  // Supprimer une agence par ID
  deleteAgency(id: number) {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${URL}/api/agencies/${id}`, { headers });
  }
}
