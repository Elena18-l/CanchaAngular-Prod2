import { Component } from '@angular/core';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { CommonModule } from '@angular/common';
import {Players} from '../services/mockup-players';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-players',  
  imports:[CommonModule, RouterModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',

})
export class PlayersComponent {
  players = Players;
}
