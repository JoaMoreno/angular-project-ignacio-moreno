import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    public _api: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  salir(){
    this._api.auth = false;
    this.router.navigateByUrl("/login")
  }

}
