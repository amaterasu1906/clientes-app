import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { CLIENTES } from '../models/clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }
  getClientes(): Observable<Cliente[]>{
    return of(CLIENTES);
  }
}
