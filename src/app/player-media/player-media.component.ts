import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';
import { Players } from '../services/mockup-players';
import { SafeUrlPipe } from '../player-media/safe-url.pipe';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { RouterModule } from '@angular/router'; // Si necesitas enrutamiento

@Component({
  selector: 'app-player-media',
  templateUrl: './player-media.component.html',
  styleUrls: ['./player-media.component.css'],
  standalone: true, // Asegúrate de marcar el componente como standalone
  imports: [
    CommonModule, // Asegúrate de importar CommonModule para que funcione ngFor
    SafeUrlPipe
  ]
})

export class PlayerMediaComponent {
  @Input()player?: Player;
  @Output() closeModal = new EventEmitter<void>();

  activeIndex = 0; // Índice de la imagen activa en el carrusel
  isModalOpen = false;
  isVideoModalOpen = false;

  openImageModal(index: number): void {
    this.activeIndex = index;
    this.isModalOpen = true;
  }

  openVideoModal():void{
    this.isVideoModalOpen = true;
  }

  closeImageModal(): void{
    this.isModalOpen = false;
    this.closeModal.emit();
  }

  closeVideoModal(): void{
    this.isVideoModalOpen = false;
    this.closeModal.emit();
  }

  setActiveImage(index: number): void {
    this.activeIndex = index;
  }

  setActiveVideo(index: number): void {
    this.activeIndex = index;
  }

}

