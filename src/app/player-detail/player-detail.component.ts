import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // <-- IMPORTAR CommonModule

import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/playerService';
import {Player} from '../services/player';
import {Router, ActivatedRoute, RouterModule } from '@angular/router';
import {Players} from '../services/mockup-players';
import { Location } from '@angular/common';  //esto es para ir para atrás
import { FormsModule } from '@angular/forms';
import { PlayerMediaComponent } from '../player-media/player-media.component';
@Component({
  selector: 'app-player-detail',  
  standalone: true,
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class PlayerDetailComponent implements OnInit {
  player?: Player;
  
  constructor
  (private route: ActivatedRoute, 
  private playerService: PlayerService,
  private location: Location,
  private router: Router ) { }
  ngOnInit():void {
    this.getPlayerDetails();
    // this.getMedia();
  }
  getPlayerDetails(): void {
    const playerId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
    console.log('ID del jugador:', playerId); // <-- Agregar esto para depurar
    this.player = Players.find(player => player.id === playerId);
    console.log('Jugador encontrado:', this.player); // <-- Verificar si el jugador existe
  }
  
  goBack(): void {
    this.location.back();
  }

  // getMedia(): void {
  //   const playerId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
  //   console.log('ID del jugador:', playerId); // <-- Agregar esto para depurar
  //   this.player = Players.find(player => player.id === playerId);
  //   console.log('Jugador encontrado:', this.player); // <-- Verificar si el jugador existe
  //   this.router.navigate(['/player/:id/media']);
  // }
}

