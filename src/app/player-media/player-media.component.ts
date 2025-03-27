import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../player-media/safe-url.pipe';

@Component({
  selector: 'app-player-media',
  templateUrl: './player-media.component.html',
  styleUrls: ['./player-media.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SafeUrlPipe
  ]
})
export class PlayerMediaComponent implements OnInit {

  // 🔹 Inicializar 'player' como un objeto vacío en lugar de undefined.
  player: Player = {
    id: '',
    name: '',
    age: 0,
    foto: '',
    portrait: '',
    team: '',
    position: '',
    stature: 0,
    average: 0,
    shirtNumber: 0,
    skills: { fisico: 0, tecnica: 0, fuerzaMental: 0, habilidadEspecial: 0, resistencia: 0 },
    bio: '',
    gallery: [],
    video: []
  }; // El jugador será de tipo Player o undefined
  @Input() playerId!: string;
  activeIndex = 0;
  modalType: 'image' | 'video' | null = null;
gallery: any;
 

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.playerId = params.get('id') || '';  // Asegúrate de que sea un string
      this.loadPlayerDetails();  // Ahora que tienes el playerId, puedes cargar los detalles
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playerId'] && !changes['playerId'].firstChange) {
      this.loadPlayerDetails(); // Recargar datos cuando cambie el jugador
    }
  }
  loadPlayerDetails(): void {
    if (this.playerId && this.playerId.length > 0) {
      this.playerService.getPlayerDetails(this.playerId).subscribe(player => {
        if (player) {
          this.player = player;
        } else {
          console.error('No se pudo obtener detalles del jugador');
          this.player = { ...this.player };  // Mantener la estructura inicial
        }
      });
    } else {
      console.error('playerId no es válido');
    }
  }
    setActive(index: number) {
      // implementation of the setActive function
    }
    get maxLength(): number {
      if (this.player && this.player.gallery) {
        return this.modalType === 'image' ? this.player.gallery.length : 0;
      } else if (this.player && this.player.video) {
        return this.modalType === 'video' ? this.player.video.length : 0;
      } else {
        return 0;
      }
    }
  
  
  

  

  goBack(): void {
    this.location.back();  // Volver a la página anterior
  }

  openModal(type: 'image' | 'video', index: number = 0): void {
    this.modalType = type;
    this.activeIndex = index;
  }


  closeModal(): void {
    this.modalType = null;
  }
}
