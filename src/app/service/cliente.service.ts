
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente';
// import { CLIENTES } from '../models/clientes.json';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = 'http://localhost:8080/api/clientes';
  private httpHeader : HttpHeaders = new HttpHeaders({'Content-type': 'Application/json'});


  constructor(private http: HttpClient) { 

  }
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  create(cliente : Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.url, cliente, {headers: this.httpHeader});
  }
  getCliente(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente, {headers: this.httpHeader});
  }
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.httpHeader});
  }
}
