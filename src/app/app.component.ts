import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SearchService } from './services/searchService';
import { PlayerResultsComponent } from './player-results/player-results.component';
import { NgIf } from '@angular/common';
import { PlayersComponent } from './players/players.component';
import { Player } from './services/player'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable,Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { NotificationService } from './services/notifications.service';
import { inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    PlayerResultsComponent, 
    NgIf, 
    PlayersComponent, 
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User | null> | undefined;
  title = 'cancha-angular';  
  searchText = ''; 
  selectedPlayer: Player | null = null;
  activeComponent: string = 'players';  
  selectedPlayerId: string | null = null; 
  token: string | null = null;
  errorMessage: string | null = null;
  newMessage: any = null;
  private tokenSubscription: Subscription | undefined;
  private errorSubscription: Subscription | undefined;
  private newMessageSubscription: Subscription | undefined;
  private readonly _messaging = inject(Messaging);
  private readonly _message = new BehaviorSubject<unknown | undefined>(undefined);
  constructor(private searchService: SearchService, private notificationService: NotificationService) {}
  
  message$ = this._message.asObservable();

  ngOnInit(): void {
    this.notificationService.requestPermissionAndGetToken();
  
    this.tokenSubscription = this.notificationService.token$.subscribe((token) => {
      if (token) {
        this.token = token;
        console.log('✅ Token FCM recibido en AppComponent:', token);
      } else {
        console.warn('⚠️ Token aún no disponible en AppComponent');
      }
    });
  
    this.errorSubscription = this.notificationService.error$.subscribe((error) => {
      this.errorMessage = error;
    });
  
    this.newMessageSubscription = this.notificationService.newMessage$.subscribe((message) => {
      this.newMessage = message;
    });
  }
  
    

  ngOnDestroy() {
    // Nos desuscribimos de las suscripciones para evitar fugas de memoria
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
    if (this.newMessageSubscription) {
      this.newMessageSubscription.unsubscribe();
    }
  }

  onPlayerSelected(player: Player) {
    this.selectedPlayer = player; 
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.updateSearchText(input.value);
  }

  setComponent(component: string) {
    this.activeComponent = component;
  }

  resetSelection() {
    this.selectedPlayerId = null;
  }

  
}
