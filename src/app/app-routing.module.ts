import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form/form.component';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form/:id', component: FormComponent},
  {path: 'clientes/form', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
