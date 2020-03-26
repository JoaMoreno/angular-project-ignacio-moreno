import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventEmitter } from '@angular/core';
import { UserApiI } from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form: FormGroup;

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
      username: [""],
      email: ["", [Validators.email, Validators.required]],
      address: this.formBuilder.group({
        street: [""],
        suite: [""],
        city: [""],
        zipcode: [""]
      }),
      phone: ["",[Validators.required]],
      company: this.formBuilder.group({
        name: [""],
        catchPhrase: [""],
        bs: [""]
      }),
      website: [""],
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this._api.createMyUser(this.form.value)
      this.form.reset()
    } else {
      this.form.markAllAsTouched();
    }
  }

  // Auxiliary Functions

  // Getters
  get nameField() {
    return this.form.get("name");
  }
  get emailField() {
    return this.form.get("email");
  }
  get phoneField() {
    return this.form.get("phone");
  }

  // Getters Validations
  get nameFieldValid() {
    return this.nameField.hasError("required") && this.nameField.touched;
  }
  get emailFieldValid() {
    return this.emailField.errors && this.emailField.touched;
  }
  get phoneFieldValid() {
    return this.phoneField.hasError("required") && this.phoneField.touched;
  }


}