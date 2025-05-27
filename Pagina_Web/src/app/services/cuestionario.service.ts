import { Injectable } from '@angular/core';
import {environment } from '../../environments/environment'
import { Cuestionario } from '../models/cuestionario';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  tituloCuestionario: string;
  descripcionCuestionario: string;
  myAppUrl : string;
  myApiUrl : string;

  constructor() {
    this.myApiUrl = 'api/cuestionario';
  }
  
  guardarCuestionario(cuestionario: Cuestionario): Observable<any> {
    console.log('Simulando guardado de cuestionario:', cuestionario);
    return of({ success: true });
  }
}
