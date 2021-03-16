import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { ClienteService } from './service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetalertServiceService } from './service/sweetalert-service.service';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ClienteService,
    SweetalertServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
