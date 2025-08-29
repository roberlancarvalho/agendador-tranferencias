import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Transferencia } from '../../../core/models/transferencia';
import { TransferenciaService } from '../../../core/transferencia.service';

@Component({
  selector: 'app-lista-transferencias',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  displayedColumns = ['id', 'contaOrigem', 'contaDestino', 'valor', 'taxa', 'dataAgendamento', 'dataTransferencia'];
  dataSource: Transferencia[] = [];
  carregando = true;
  erro: string | null = null;

  constructor(private service: TransferenciaService) {}

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: data => { this.dataSource = data; this.carregando = false; },
      error: e => { this.erro = e.message; this.carregando = false; }
    });
  }
}
