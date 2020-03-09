import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { User } from '../models/user';
import { NotifierService } from 'angular-notifier';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'src/_helpers/custom.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [AppService],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private _service: AppService, private _notifier: NotifierService) { }

  user = {} as User;
  errorMessage: string;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      birthDate: new FormControl(this.user.birthDate, [Validators.required, CustomValidators.dateValidator]),
      idCode: new FormControl(this.user.idCode, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
    });
  }

  isFieldValid(field: AbstractControl) {
    return field.invalid && field.touched;
  }


  register() {
    this._service.postUser(this.registerForm.value).subscribe((user: User) => {
      this.user = user;
      this._notifier.notify('success', 'User created.');
    }, (error) => {
      this.errorMessage = error;
      this._notifier.notify('error', this.errorMessage);
    });
  }

}
