import { CommonModule, formatDate } from '@angular/common';
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

function notPastDate() {
  return (control: import('@angular/forms').AbstractControl) => {
    const v = control.value;
    if (!v) return null;
    const val = v instanceof Date ? v : new Date(v);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    val.setHours(0, 0, 0, 0);
    return val < today ? { pastDate: true } : null;
  };
}

function maxDaysFromToday(maxDays: number) {
  return (control: import('@angular/forms').AbstractControl) => {
    const v = control.value;
    if (!v) return null;
    const val = v instanceof Date ? v : new Date(v);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    val.setHours(0, 0, 0, 0);
    const diffMs = val.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > maxDays ? { tooFar: { maxDays, diffDays } } : null;
  };
}

function contasDiferentes(group: import('@angular/forms').AbstractControl) {
  const origem = group.get('contaOrigem')?.value;
  const destino = group.get('contaDestino')?.value;
  if (!origem || !destino) return null;
  return origem === destino ? { sameAccounts: true } : null;
}

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
    this.form = this.fb.group(
      {
        contaOrigem: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        contaDestino: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        valor: [null, [Validators.required, Validators.min(0.01)]],
        dataTransferencia: ['', [Validators.required, notPastDate(), maxDaysFromToday(50)]],
      },
      { validators: [contasDiferentes] }
    );
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const dto = this.form.value as unknown as NovaTransferenciaDTO;

    (dto as any).valor = Number((dto as any).valor);

    const d = this.form.value.dataTransferencia;
    if (d instanceof Date) {
      dto.dataTransferencia = formatDate(d, 'yyyy-MM-dd', 'pt-BR');
    }

    this.service.criar(dto).subscribe({
      next: () => {
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
