import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: Boolean;
  isInvalid: Boolean = false;
  msg: string;

  constructor(
    private formBuilder: FormBuilder,
    private _api: UserService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  send(event: Event) {

    event.preventDefault();
    this.loading = true;
    this.msg = undefined;

    if (this.form.valid) {
      /** Peticion y retorno del Observable */
      this._api.login(this.form.value)
        .subscribe(
          res => {
            console.log("[res]", res.msg);
          },
          err => {
            console.log("[error]", err.msg);
            this.msg = err.msg;
            this.setInvalid();
          },
          () => this.router.navigateByUrl("/usuarios")
        );
    } else {

      this.form.markAllAsTouched();
      this.loading = false;
    }
  }

  // Getters
  get nameField() {
    return this.form.get("name");
  }
  get passwordField() {
    return this.form.get("password");
  }

  // Getters Validations
  get nameFieldValid() {
    return this.nameField.hasError("required") && this.nameField.touched;
  }
  get passwordFieldValid() {
    return this.passwordField.errors && this.passwordField.touched;
  }

  // Auxiliary Functions
  private setInvalid(){
    /** 
     * @param loading muestra el spinner de carga
     * @param isInvalid controla el error en los inputs
     */
    this.loading = false;
    this.isInvalid = true;
    setTimeout(()=> this.isInvalid = false,1250)
  }

}