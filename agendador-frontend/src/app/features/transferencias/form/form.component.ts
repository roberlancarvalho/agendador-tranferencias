import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransferenciaService } from '../../../core/transferencia.service';
import { NovaTransferenciaDTO } from '../../../core/models/nova-transferencia-dto';


@Component({
  selector: 'app-form-transferencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  loading = false;
  erro: string | null = null;

  // use definite assignment
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: TransferenciaService,
    private router: Router
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
    this.erro = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const dto = this.form.value as unknown as NovaTransferenciaDTO;
    this.service.criar(dto).subscribe({
      next: (_) => {
        this.loading = false;
        this.router.navigate(['/transferencias']);
      },
      error: (e) => {
        this.loading = false;
        this.erro = e.message;
      },
    });
  }
}
