import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { UserApiI } from "../../models/user.model";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from '@angular/common';
import { pluck } from 'rxjs/operators';

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"]
})
export class DetalleComponent implements OnInit {
  user: UserApiI;
  constructor(
    private _api: UserService,
    private activatedRoute: ActivatedRoute,
    private location: Location) {}

  ngOnInit(): void {
    this.newGetUser()
  }

  newGetUser(){
    this.activatedRoute.paramMap
    .pipe(pluck<ParamMap, number>("params","id") )
    .subscribe( res => this.user = this._api.allUsers[res] )
  }

  goBack(): void {
    this.location.back();
  }
}
