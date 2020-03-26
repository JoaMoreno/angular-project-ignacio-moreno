import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/components/login/login.component';
import { UsuariosComponent } from './users/components/usuarios/usuarios.component';
import { DetalleComponent } from './users/components/detalle/detalle.component';
import { ErrorComponent } from './shared/components/error/error.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'usuarios', component: UsuariosComponent},
  {path:'detalle/:name', component: DetalleComponent},
  {path:'**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
