import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { UserApiI } from "../../models/user.model";


@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  users: UserApiI[] = [];
  loading: boolean = true;
  msgError: boolean = false;

  constructor(private _api: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._api.getUsers()
    this._api.userEmitter.subscribe(
      res => this.saveUsers(res)
    )
  }

  goToProduct(index: number) {
    this.router.navigate(["/detalle/", index]);
  }

  deleteUser(index) {
    this.users.splice(index, 1);
    if (this.users.length < 1) this.msgError = true;
  }

  // Auxiliary Functions

  saveUsers(users) {
    this.loading = false;
    /**
     * Para forzar el error de usuarios vacios comentar:
     * " this.users = users "
     */
    this.users = users;
    this.usersEmpyError();
  }

  usersEmpyError(err?) {
    /**
     * usersEmpy muestra el en html usuarios no encontrados
     * @param err parametro opcional, si existe lo imprime
     */
    this.loading = false;
    this.users.length < 1 ? this.msgError = true : this.msgError = false
    err ? console.log(err) : null;
  }
}
