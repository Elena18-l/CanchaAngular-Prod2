import {Injectable} from '@angular/core';

import {Player} from './player';
import {Players} from './mockup-players';


@Injectable({providedIn: 'root'})
export class PlayerService {
getPlayerDetails(id: number): Player | undefined { //patata
  return this.playersMock.find(player => player.id === id);
 
}

private playersMock: Player[] = Players;

getPlayers(): Player[]{
  return this.playersMock;
}
}
