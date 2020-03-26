import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { UserService } from './services/user.service';

// Modules
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { AddUserComponent } from './components/add-user/add-user.component';



@NgModule({
  declarations: [LoginComponent, UsuariosComponent, DetalleComponent, HomeComponent, AddUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SharedModule
  ],
  providers:[UserService]
})
export class UsersModule { }
