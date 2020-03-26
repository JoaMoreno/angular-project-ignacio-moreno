import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { UserApiI } from "../../models/user.model";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"]
})
export class DetalleComponent implements OnInit {
  user: UserApiI;
  constructor( 
    private _api: UserService, 
    private router: Router,
    private location: Location) {
      this.getUser()
    }

  ngOnInit(): void {
  }

  getUser(){
    this._api.getUser().subscribe(
      res => (this.user = res),
      /** En caso de que el usuario no exista o se ingrese otra url */
      () => this.router.navigateByUrl("/usuarios")
    );
  }

  goBack(): void {
    this.location.back();
  }
}
