import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { SweetalertServiceService } from 'src/app/service/sweetalert-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo: string = "Crear cliente";
  constructor(private clienteService: ClienteService, 
    private router: Router, private activatedRoute: ActivatedRoute,
    private alert:SweetalertServiceService) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  create(){
    console.log("Cliente");
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe( (response) =>{
      this.router.navigate(['/clientes']);
      this.alert.modalSuccess('Cliente agregado', 'Se agrego correctamente el cliente');
    });
    
  }

  cargarCliente(){
    this.activatedRoute.params.subscribe( (params) =>{
      let id = params['id'];
      if( id ){
        this.clienteService.getCliente(id).subscribe( (response) =>{
          this.cliente = response;
        });
      }
    });
  }
  update(){
    this.clienteService.update(this.cliente).subscribe( response =>{
      this.router.navigate(['/clientes']);
      this.alert.modalSuccess('Cliente actualizado', 'Se actualizo correctamente el cliente');
    })
  }
}
