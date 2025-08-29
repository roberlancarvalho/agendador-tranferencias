import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Transferencia } from '../../../core/models/transferencia';
import { TransferenciaService } from '../../../core/transferencia.service';

@Component({
  selector: 'app-lista-transferencias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista.component.html', 
})

export class ListaComponent implements OnInit {
  itens: Transferencia[] = [];
  carregando = true;
  erro: string | null = null;

  constructor(private service: TransferenciaService) {}

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: data => { this.itens = data; this.carregando = false; },
      error: e => { this.erro = e.message; this.carregando = false; }
    });
  }
}
