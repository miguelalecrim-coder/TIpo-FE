import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarTipoComponent } from './criar-tipo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CriarTipoComponent],
  template: `
    <div class="container">
      <h1>Gestão de Tipos</h1>
      <app-criar-tipo></app-criar-tipo>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
  `]
})
export class AppComponent {
  title = 'criar-tipo-app';
}