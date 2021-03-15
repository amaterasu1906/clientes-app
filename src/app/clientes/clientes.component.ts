import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../service/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];
  constructor(private clienteService: ClienteService) {
    this.loadClientes();
  }
  loadClientes(){
    const $subs = this.clienteService.getClientes().subscribe( (clientes)=>{
      this.clientes = clientes;
      $subs.unsubscribe();
    });
  }

  ngOnInit(): void {
  }

  delete(cliente: Cliente){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro que desea eliminar?',
      text: `Se eliminará al cliente ${cliente.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe((response)=>{
          this.loadClientes();
          swalWithBootstrapButtons.fire(
            'Eliminado con exito!',
            'Your file has been deleted.',
            'success'
          )
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se cancelo la operación',
          'error'
        )
      }
    });
  }
}
