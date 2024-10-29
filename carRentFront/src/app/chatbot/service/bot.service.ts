import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  private projectId = 'carrentbot-rles';
  private sessionId = '6';
  private token = 'ya29.c.c0ASRK0GZxuuqIUkstpGvEVfm-2eG8xSa49noNxK2UZYLUvwPg0zIlz750n9w03qe6S8fOd2QSzgWlNuhakeP2g2itYGD4_wPLHCMyoxRvG38LlaVDozAM6HXngh1JqJeSp3RJeNeIMnA7UEL8YtBGOpT7iutLCvyoNjGjnx9dHwoNUSAmgM1LuCxSDO7p-FaucjMmva8W6yeksYeXso-EHUGpihvXbU51EnFnnHqbfP1Dl51p82ixx6I1M3pQ8MmmFvfMLV614IuUPEXQ0aUGE-8N3PRS_-9gohJuLWhjWrs8Jpx_4_Wr11tcU_Yz4AFsM_ESXBwBBk4rqwzemFzit1ElVDs7eWOFiVS3CapJWveklNTAlE8JMPbvq9kp3TUVbpGM3AG399PSyj86MlUOUgylBwWgBU2zOtBU391fhzjj7t3YezUmRxdb3Raviti0aOYX8f37c2zewb6Vfevsh9WtoB-b2SlRXVzO0XWpJldc6QOQrrFcizdOfhX0o7Z-iFqWc7MZdBgMFWrnQOYzZ1yB17heOqYn1hX6chVFioSpzkmYlMaaZ1_M1xf26O4giIxccmpSYv6eapteZQukJjpx4gn62o2eJxBxY7R24xSt9n_sjciv8ojcMsvySffm-SVwFV-OfFuv7WpWy_Sosi_UO_bbsoOc9ga4O1ojSRVWyxqpO3YjnBIZBxkV_Qp1UiajUfkk0wtZb8UuFXtm-XmU83M4ql1_gp0a8f1xoW6_kwiUkym6JWXwvfUZbZB7tF9aJ_Q0MZ8y5peQwdYFmR8Vo3j-3_eeMj816bQUgMF_RMt2v2uub4SooyqdB_OSdRxjvkBIBl79-sF0ZdoI3Jej01IVSBR_hrh_2F01iwqJqtBsjFqyWiVyyoUfn5njYvqdbf4YlnFV6zrvUQ5FpVUZdBMOmXOglSQ6U_-yFma5OfWv56F35Ipia53Rq2IFVMcI0jSS3iZ2V0kRMwMJ9MuitegBoz9c-fscSYov9O6Zg0pRR58n1rm';

  private dialogflowUrl = `https://dialogflow.googleapis.com/v2/projects/${this.projectId}/agent/sessions/${this.sessionId}:detectIntent`;

  constructor(private http: HttpClient) {}

  public sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      queryInput: {
        text: {
          text: message,
          languageCode: 'fr', // Change to your desired language
        },
      },
    };

    return this.http.post(this.dialogflowUrl, body, { headers });
  }
}
