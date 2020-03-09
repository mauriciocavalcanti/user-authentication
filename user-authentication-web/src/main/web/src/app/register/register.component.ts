import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { User } from '../models/user';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [AppService],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _service: AppService, private _notifier: NotifierService) { }

  user = {} as User;
  errorMessage: string;

  ngOnInit(): void {
  }

  register(form) {
    this._service.postUser(form.value).subscribe((user: User) => {
      this.user = user;
      this._notifier.notify('success', 'User created.');
    }, (error) => {
      this.errorMessage = error;
      this._notifier.notify('error', this.errorMessage);
    });
  }

}
