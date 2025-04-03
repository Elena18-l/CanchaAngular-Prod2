import { Routes } from '@angular/router';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersComponent } from './players/players.component';
import { PlayerMediaComponent } from './player-media/player-media.component';
// import { FormCrudComponent } from './form-crud/form-crud.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' }, // Redirigir correctamente  
  // Lista de jugadores
  { path: 'player/:id', component: PlayerDetailComponent }, // Detalle de un jugador
  {path: 'player/:id/media', component: PlayerMediaComponent},
  // {path: 'player/addPlayer', component: FormCrudComponent }, // Formulario para añadir un jugador
];
