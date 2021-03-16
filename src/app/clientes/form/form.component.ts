import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { SweetalertServiceService } from 'src/app/service/sweetalert-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // cliente: Cliente = new Cliente();
  titulo: string = "Crear cliente";
  formCliente! : FormGroup;
  updateBoton : boolean =  false;
  errores!: string[];
  constructor(private clienteService: ClienteService, 
    private router: Router, private activatedRoute: ActivatedRoute,
    private alert:SweetalertServiceService, private fb: FormBuilder) {
      // this.formCliente = this.fb.group({
      //   id : [],
      //   nombre: ['', Validators.required],
      //   apellido: ['', Validators.required],
      //   email: ['', Validators.compose([
      //     Validators.required, Validators.email
      //   ])],
      //   createAt:[]
      // })
      this.formCliente = this.fb.group({
        id : [],
        nombre: [],
        apellido: [],
        email: [],
        createAt:[]
      })
     }

  ngOnInit(): void {
    this.cargarCliente();
    this.updateBoton = false;
  }

  create(){
    console.log("Cliente");
    let cliente = this.formCliente.value;
    this.clienteService.create(cliente).subscribe( (response) =>{
      this.router.navigate(['/clientes']);
      this.alert.modalSuccess('Cliente agregado', 'Se agrego correctamente el cliente');
    },
    err =>{
      console.log("Entrando a errores");
      
      this.errores = err.error.errors as string[];
    }
    );
    
  }

  cargarCliente(){
    this.activatedRoute.params.subscribe( (params) =>{
      let id = params['id'];
      if( id ){
        this.clienteService.getCliente(id).subscribe( (response) =>{
          this.updateBoton = true;
          this.formCliente.setValue({
            id: response.id,
            nombre : response.nombre,
            apellido : response.apellido,
            email : response.email,
            createAt : response.createAt
          });
        });
      }
    });
  }
  update(){
    let cliente = this.formCliente.value;
    this.clienteService.update(cliente).subscribe( response =>{
      this.router.navigate(['/clientes']);
      this.alert.modalSuccess('Cliente actualizado', 'Se actualizo correctamente el cliente');
    },
    err =>{
      this.errores = err.error.errors as string[];
    });
  }
}
