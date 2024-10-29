import { Component, ViewChild, ElementRef } from '@angular/core';
import { BotService } from '../service/bot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../modules/customer/service/customer.service';

@Component({
  selector: 'app-bot-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bot-request.component.html',
  styleUrls: ['./bot-request.component.scss']
})
export class BotRequestComponent {
  public userMessage: string = '';
  public messages: { text: string, type: 'user' | 'bot' }[] = []; // Liste des messages
  public availableCars: any[] = []; // Liste des voitures disponibles

  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef;

  constructor(private chatbotService: BotService, private customerService: CustomerService) {}

  sendMessage() {
    if (this.userMessage.trim() === '') return; // Ne pas envoyer de message vide

    this.messages.push({ text: this.userMessage, type: 'user' }); // Ajouter le message de l'utilisateur

    this.chatbotService.sendMessage(this.userMessage).subscribe(
      (response) => {
        const intent = response.queryResult.intent.displayName;
        console.log(intent);
        if (intent === 'get car') {
          this.fetchAvailableCars(); // Appel de la méthode pour afficher les voitures disponibles
        } else {
          this.messages.push({
            text: response.queryResult.fulfillmentText,
            type: 'bot'
          });
        }

        this.userMessage = ''; // Réinitialiser le champ de saisie
        this.scrollToBottom(); // Faire défiler vers le bas
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // Récupérer les voitures disponibles via le service
  fetchAvailableCars() {
    this.customerService.getAllCars().subscribe(
      (cars: any) => {
        // Filtrer les voitures disponibles
        this.availableCars = cars.filter((car :any)=> car.disponible === true);

        // Ajouter la liste filtrée comme réponse du bot
        const carList = this.availableCars.map(
          car => `🚗 ${car.name} - ${car.price}DH`
        ).join('\n');

        this.messages.push({
          text: `Oui, voici les voitures disponibles:\n${carList}`,
          type: 'bot'
        });
        console.log(this.availableCars);
        this.scrollToBottom(); // Faire défiler vers le bas
      },
      (error) => {
        console.error('Erreur lors de la récupération des voitures:', error);
        this.messages.push({
          text: "Désolé, je n'ai pas pu récupérer les voitures disponibles.",
          type: 'bot'
        });
      }
    );
  }

  // Faire défiler vers le bas
  private scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
