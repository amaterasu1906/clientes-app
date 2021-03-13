import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];
  constructor(private clienteService: ClienteService) {
    clienteService.getClientes().subscribe( (clientes)=>{
      this.clientes = clientes;
    });
  }

  ngOnInit(): void {
  }

}
