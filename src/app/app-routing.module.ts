import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/components/login/login.component';
import { UsuariosComponent } from './users/components/usuarios/usuarios.component';
import { DetalleComponent } from './users/components/detalle/detalle.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { AuthGuard } from './users/guards/auth.guard';
import { UsersGuard } from './users/guards/users.guard';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  {path:'detalle/:id', component: DetalleComponent, canActivate: [UsersGuard]},
  {path:'detalle', component: DetalleComponent, canActivate: [UsersGuard]},
  {path:'**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
