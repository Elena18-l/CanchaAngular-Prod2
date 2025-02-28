import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // <-- IMPORTAR CommonModule

import { PlayerService } from '../services/playerService';
import {Player} from '../services/player';
import {Router, ActivatedRoute, RouterModule } from '@angular/router';
import {Players} from '../services/mockup-players';
import { Location } from '@angular/common';  //esto es para ir para atrás
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-media',
  templateUrl: './player-media.component.html',
  styleUrl: './player-media.component.css',
  imports: [CommonModule, FormsModule, RouterModule],
  
})
export class PlayerMediaComponent {
  player?: Player;  

  constructor
  (private route: ActivatedRoute, 
  private playerService: PlayerService,
  private location: Location ) { }
  ngOnInit():void {
    this.getPlayerDetails();
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
}