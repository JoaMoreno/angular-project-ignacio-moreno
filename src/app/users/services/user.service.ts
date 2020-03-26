import { Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { UserI, UserApiI } from "../models/user.model";
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  allUsers: UserApiI[];
  currentUser: UserApiI;
  myUsers: UserApiI[] = [];

  auth: boolean;

  @Output() userEmitter: EventEmitter<UserApiI[]> = new EventEmitter();

  private URL: string = "https://jsonplaceholder.typicode.com/users";

  constructor(private _http: HttpClient) {}

  getUsers() {
    this._http.get<UserApiI[]>(this.URL).subscribe(
      res => {
        this.allUsers = [...res, ...this.myUsers];
        this.userEmitter.emit(this.allUsers);
      },
      err => console.log("[ERROR]", err)
    );
  }

  createMyUser(user: UserApiI) {
    user.id = this.allUsers.length + 1;
    user.local = true;
    this.allUsers.push(user);
    this.myUsers.push(user);
    this.userEmitter.emit(this.allUsers);
  }

  /**
   * La funcion login() retorna un observable que compara el usuario y contraseña
   * que recibe con las de prueba, si estas coinciden, se completa en 1,5s.
   * Los setTimeout son para simular el delay de la peticion
   */
  login(user: UserI) {
    const { name, password } = user;

    const obs$ = new Observable<any>(subs => {
      if (name === "test" && password === "Ayi+2020") {
        subs.next({ msg: "OK" });
        setTimeout(() => {
          subs.complete();
          this.auth = true;
        }, 1500);
      } else {
        setTimeout(
          () => subs.error({
              msg: "The User Name or Password is Incorrect"}),1000);
      }
    });

    return obs$;
  }

  setUser(user: UserApiI) {
    this.currentUser = user;
  }
  getUser() {
    return this.currentUser
      ? of<UserApiI>(this.currentUser)
      : throwError("error");
  }
}
