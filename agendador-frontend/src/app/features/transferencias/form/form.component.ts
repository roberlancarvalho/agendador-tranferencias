import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NovaTransferenciaDTO } from '../../../core/models/nova-transferencia-dto';
import { TransferenciaService } from '../../../core/transferencia.service';

@Component({
  selector: 'app-form-transferencia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: TransferenciaService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      contaOrigem: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contaDestino: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      dataTransferencia: ['', [Validators.required]],
    });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.value.contaOrigem === this.form.value.contaDestino) {
      this.snack.open('Conta de origem e destino não podem ser iguais.', 'OK', { duration: 4000 });
      return;
    }

    this.loading = true;
    const dto = this.form.value as unknown as NovaTransferenciaDTO;

    const d = this.form.value.dataTransferencia;
    if (d instanceof Date) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      dto.dataTransferencia = `${yyyy}-${mm}-${dd}`;
    }

    this.service.criar(dto).subscribe({
      next: (_) => {
        this.loading = false;
        this.snack.open('Transferência agendada com sucesso!', 'OK', { duration: 3000 });
        this.router.navigate(['/transferencias']);
      },
      error: (e) => {
        this.loading = false;
        this.snack.open(`Erro: ${e.message}`, 'OK', { duration: 4000 });
      },
    });
  }
}
