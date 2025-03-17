import { Component, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Players } from '../services/mockup-players';
import { FormsModule } from '@angular/forms';
import { Player } from '../services/player';
import { PlayerSearchPipe } from '../player-search/player-search.pipe';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common'; 
@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, PlayerSearchPipe, PlayerCardComponent],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
  providers:[Location]
})
export class PlayersComponent {
  @Output() playerSelected = new EventEmitter<Player>();

  players = Players;
  searchText: string = '';
  selectedFilters: Partial<Player & { stature?: string; average?: string }> = {};
  showFilterDropdown: boolean = false;
  selectedPlayer: Player | null = null;

  constructor(private location: Location, private router: Router, private eRef:ElementRef) {} 

  get filteredPlayers() {
    return this.players.filter(player => {
      const matchesSearch = this.searchText
        ? (Object.keys(player) as (keyof Player)[]).some(key => {
            const value = player[key];
            return typeof value === 'string' || typeof value === 'number'
              ? value.toString().toLowerCase().includes(this.searchText.toLowerCase())
              : false;
          })
        : true;

      const matchesFilters = Object.entries(this.selectedFilters).every(([key, value]) => {
        if (key === 'stature' && value) {
          return this.isWithinRange(player.stature, value);
        }
        if (key === 'average' && value) {
          return this.isWithinRange(player.average, value);
        }
        return value !== undefined && value !== '' ? (player as any)[key] == value : true;
      });

      return matchesSearch && matchesFilters;
    });
  }

  isWithinRange(playerValue: number, selectedRange: string): boolean {
    if (!selectedRange) return true;
    const [min, max] = this.parseRange(selectedRange);
    return playerValue >= min && playerValue <= max;
  }

  parseRange(range: string): [number, number] {
    return range.split('-').map(Number) as [number, number];
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  clearFilters() {
    this.selectedFilters = {};
    this.searchText = '';
  }

  selectPlayer(player: Player) {
    this.playerSelected.emit(player); // ✅ Ahora emite correctamente el jugador seleccionado
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.showFilterDropdown && !this.eRef.nativeElement.contains(event.target)) {
      this.showFilterDropdown = false;
    }
  }

  

  trackByPlayerId(index: number, player: any): number {
    return player.id;
  }
  selectedPlayerId: number | null = 0;

  toggleSelected(index: number) {
    if (this.selectedPlayerId === null || this.selectedPlayerId !== index) {
      this.selectedPlayerId = index;
    }
  }

  isSelected(index: number): boolean {
    console.log('selectedPlayerId: ', this.selectedPlayerId);
    return this.selectedPlayerId === index;
  }

  isSelectedPlayerZero(): boolean {
    return this.selectedPlayerId === 0;
  }
}
