import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from, of, throwError } from "rxjs";
import { UserI, UserApiI } from "../models/user.model";
import { timeout } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  currentUser: UserApiI;
  myUsers: UserApiI[] = []
  private URL: string = "https://jsonplaceholder.typicode.com/users";

  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http.get<UserApiI>(this.URL);
  }
  createUser(user: UserApiI){
    this.myUsers.push(user)
  }
  getMyUsers(){
    return of(this.myUsers);
    
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
        subs.next({msg: "OK"});
        setTimeout(() => subs.complete(), 1500);
      } else {
        setTimeout(() =>subs.error({
              msg: "The User Name or Password is Incorrect"
            }),1000);
      }
    });

    return obs$;
  }

  setUser(user: UserApiI){
    this.currentUser = user
  }
  getUser(){
    return this.currentUser 
    ? of<UserApiI>(this.currentUser) 
    : throwError('error')
  }
}