import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tipo {
  id?: number;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private apiUrl = 'http://localhost:5073/api/tipos'; // Ajuste a URL conforme sua API

  constructor(private http: HttpClient) {}

  criarTipo(tipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(this.apiUrl, tipo);
  }
}