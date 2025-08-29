import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transferencia } from './models/transferencia';
import { NovaTransferenciaDTO } from './models/nova-transferencia-dto';

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

  private handle(err: any) {
    const msg =
      err?.error?.error || (err?.error && Object.values(err.error).join('; ')) || 'Erro inesperado';
    return throwError(() => new Error(msg));
  }
}
