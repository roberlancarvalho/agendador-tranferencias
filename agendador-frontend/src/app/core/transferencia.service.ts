import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NovaTransferenciaDTO } from './models/nova-transferencia-dto';
import { Transferencia } from './models/transferencia';

const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class TransferenciaService {
  private readonly base = `${API_BASE}/api/transferencias`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(this.base).pipe(catchError(this.handle));
  }

  criar(dto: NovaTransferenciaDTO): Observable<Transferencia> {
    return this.http.post<Transferencia>(this.base, dto).pipe(catchError(this.handle));
  }

  deletar(id: number) {
    return this.http
      .delete(`${this.base}/${id}`, {
        responseType: 'text' as 'json',
      })
      .pipe(catchError(this.handle));
  }

  private handle(err: any) {
    const msg =
      err?.error?.error ||
      (err?.status === 422 ? 'Não há taxa aplicável para esse intervalo.' : null) ||
      (err?.error && typeof err.error === 'object'
        ? Object.values(err.error).join('; ')
        : err?.message) ||
      'Erro inesperado';
    return throwError(() => new Error(msg));
  }
}
