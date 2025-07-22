import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TipoService,Tipo } from './tipo.service';

@Component({
  selector: 'app-criar-tipo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="criar-tipo-container">
      <!-- Botão para abrir o formulário -->
      <button 
        *ngIf="!mostrarFormulario" 
        (click)="abrirFormulario()" 
        class="btn-criar">
        Criar Novo Tipo
      </button>

      <!-- Formulário para criar tipo -->
      <div *ngIf="mostrarFormulario" class="form-container">
        <h2>Criar Tipo</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="descricao">Descrição:</label>
            <input 
              id="descricao"
              formControlName="descricao" 
              type="text"
              class="form-control"
              placeholder="Digite a descrição do tipo"
            />
            <div *ngIf="form.get('descricao')?.invalid && form.get('descricao')?.touched" 
                 class="error-message">
              A descrição é obrigatória
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              [disabled]="form.invalid || carregando"
              class="btn-submit">
              {{carregando ? 'Criando...' : 'Criar'}}
            </button>
            <button 
              type="button" 
              (click)="onCancel()"
              class="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Mensagens de feedback -->
      <div *ngIf="mensagem" class="message" [ngClass]="{'success': !erro, 'error': erro}">
        {{mensagem}}
      </div>

      <!-- Lista de tipos criados -->
      <div *ngIf="tipos.length > 0" class="tipos-lista">
        <h3>Tipos Criados</h3>
        <ul>
          <li *ngFor="let tipo of tipos" class="tipo-item">
            <span>{{tipo.descricao}}</span>
            <small *ngIf="tipo.id">(ID: {{tipo.id}})</small>
          </li>
        </ul>
      </div>
    </div>
`
})
export class CriarTipoComponent implements OnInit {
  form: FormGroup;
  mostrarFormulario = false;
  carregando = false;
  mensagem = '';
  erro = false;
  tipos: Tipo[] = [];

  constructor(
    private fb: FormBuilder,
    private tipoService: TipoService
  ) {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
   
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.limparMensagem();
  }

  onSubmit() {
    if (this.form.valid) {
      this.carregando = true;
      this.limparMensagem();

      const novoTipo: Tipo = {
        descricao: this.form.value.descricao.trim()
      };

      this.tipoService.criarTipo(novoTipo).subscribe({
        next: (response) => {
          this.mostrarMensagem('Tipo criado com sucesso!', false);
          this.form.reset();
          this.mostrarFormulario = false;
          this.carregando = false;
        },
        error: (error) => {
          console.error('Erro ao criar tipo:', error);
          this.mostrarMensagem('Erro ao criar tipo. Tente novamente.', true);
          this.carregando = false;
        }
      });
    }
  }

  onCancel() {
    this.mostrarFormulario = false;
    this.form.reset();
    this.limparMensagem();
  }

//   private carregarTipos() {
//     this.tipoService.obterTipos().subscribe({
//       next: (tipos) => {
//         this.tipos = tipos;
//       },
//       error: (error) => {
//         console.error('Erro ao carregar tipos:', error);
//       }
//     });
//   }

  private mostrarMensagem(mensagem: string, erro: boolean) {
    this.mensagem = mensagem;
    this.erro = erro;
    
    // Limpar mensagem após 5 segundos
    setTimeout(() => {
      this.limparMensagem();
    }, 5000);
  }

  private limparMensagem() {
    this.mensagem = '';
    this.erro = false;
  }
}