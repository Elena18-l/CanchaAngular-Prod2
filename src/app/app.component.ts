import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule completo

@Component({
  selector: 'app-root',
  imports: [RouterModule],  // Usa RouterModule en lugar de solo RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'chancha-angular';
}
