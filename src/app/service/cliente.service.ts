
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { catchError, map, tap } from 'rxjs/operators'
import { SweetalertServiceService } from './sweetalert-service.service';
import { Router } from '@angular/router';
import { DatePipe, formatDate} from '@angular/common';

// import { CLIENTES } from '../models/clientes.json';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = 'http://localhost:8080/api/clientes';
  private httpHeader : HttpHeaders = new HttpHeaders({'Content-type': 'Application/json'});


  constructor(private router: Router, private http: HttpClient, private alert:SweetalertServiceService) { 

  }
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url)
    .pipe(
      tap(response =>{
        // let clientes = response as Cliente[];
        response.forEach( cliente =>{
          console.log(cliente.nombre);
        })
      }),
      map( response => {
        // let clientes = response as Cliente[];
        return response.map( cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // let datePipe = new DatePipe('en-US');
          // cliente.createAt = datePipe.transform(cliente.createAt, 'dd/MM/yyy');
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyy', 'en-US');
          // cliente.createAt = formatDate(cliente.createAt, 'EEEE dd, MMMM yyy', 'es');
          return cliente;
        });
      }),
      tap(response =>{
        // let clientes = response as Cliente[];
        response.forEach( cliente =>{
          console.log(cliente.nombre);
        })
      })
    )
    ;
  }

  create(cliente : Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.url, cliente, {headers: this.httpHeader})
    .pipe( 
      catchError( e=>{
        // del tipo de error que se esta generando BadRequest
        if( e.status == 400){
          return throwError(e);
        }
        console.log(e.error.mensaje);
        this.alert.modalError(e.error.mensaje, e.error.error);
        return throwError(e);
      })
    );
  }
  getCliente(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`)
    .pipe( 
      catchError( e=>{
        this.router.navigate(['/clientes'])
        console.log(e.error.mensaje);
        this.alert.modalError('Error al editar',e.error.mensaje);
        return throwError(e);
      })
    );
  }
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente, {headers: this.httpHeader})
    .pipe( 
      catchError( e=>{
        if( e.status == 400){
          return throwError(e);
        }
        console.log(e.error.mensaje);
        this.alert.modalError(e.error.mensaje, e.error.error);
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`, {headers: this.httpHeader})
    .pipe( 
      catchError( e=>{
        console.log(e.error.mensaje);
        this.alert.modalError(e.error.mensaje, e.error.error);
        return throwError(e);
      })
    );
  }
}
