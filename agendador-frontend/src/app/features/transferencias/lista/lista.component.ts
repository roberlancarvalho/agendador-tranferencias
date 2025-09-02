import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Transferencia } from '../../../core/models/transferencia';
import { TransferenciaService } from '../../../core/transferencia.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-transferencias',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  displayedColumns = [
    'id',
    'contaOrigem',
    'contaDestino',
    'valor',
    'taxa',
    'dataAgendamento',
    'dataTransferencia',
    'acoes',
  ];

  dataSource: Transferencia[] = [];
  carregando = true;
  erro: string | null = null;

  constructor(private service: TransferenciaService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.carregando = false;
      },
      error: (e) => {
        this.erro = e.message ?? 'Falha ao carregar';
        this.carregando = false;
      },
    });
  }

  deletar(id: number) {
    if (!confirm('Confirmar exclusão?')) return;
    const antes = this.dataSource;
    this.dataSource = this.dataSource.filter((t) => t.id !== id);
    this.service.deletar(id).subscribe({
      next: () => this.snack.open('Excluído com sucesso.', 'OK', { duration: 2500 }),
      error: (e) => {
        this.dataSource = antes;
        this.snack.open(`Erro ao excluir: ${e.message}`, 'OK', { duration: 4000 });
      },
    });
  }

  trackById(_: number, item: Transferencia) {
    return item.id;
  }
}
