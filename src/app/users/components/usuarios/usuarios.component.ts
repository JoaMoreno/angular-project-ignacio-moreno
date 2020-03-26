import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { delay, filter, tap, map, pluck } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserApiI } from "../../models/user.model";
import { from, of } from "rxjs";
import { EventEmitter } from 'protractor';

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
    this.getMyUsers();
  }

  getUsers() {
    this._api.getUsers().subscribe(
      res => this.saveUsers(res),
      err => this.usersEmpyError(err)
    );
  }
  getMyUsers(){
    this._api.getMyUsers().subscribe(
      res => this.saveUsers(res)
    );
  }

  goToProduct(user: UserApiI) {
    this._api.setUser(user);
    this.router.navigateByUrl("/detalle/" + user.username);
  }

  deleteUser(id) {
    for (let i = 0; i < this.users.length; i++) {
      const element = this.users[i];
      if(element.id === id){
        this.users.splice(i, 1);
        if(this.users.length < 1) this.msgError = true;
        break;
      }
    }
  }

  // deleteUser(id) {
  //   let newUsers: any = this.users
  //   for (let i = 0; i < newUsers.length; i++) {
  //     const element = this.users[i];
  //     if(element.id === id){
  //       newUsers.splice(i, 1);
  //       console.log(this.users)
  //       if(newUsers.length < 1) this.msgError = true
  //       break;
  //     }
  //     console.log(i)
  //   }
  // }

  // Auxiliary Functions

  saveUsers(users) {
    /**
     * Para forzar el error de usuarios vacios comentar:
     * " this.users = users "
     */
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      this.users.push(user)
    }
    console.log('User Saved')
    this.loading = false;
    //this.users =this.users.concat(users);
    this.usersEmpyError();
  }

  usersEmpyError(err?) {
    /**
     * usersEmpy muestra el en html usuarios no encontrados
     * @param err parametro opcional, si existe lo imprime
     */
    this.loading = false;
    if (!this.users) this.msgError = true;
    err ? console.log(err) : null;
  }
}