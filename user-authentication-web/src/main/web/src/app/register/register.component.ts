import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [AppService],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _service: AppService) { }

  user = {} as User;

  ngOnInit(): void {
  }

  register(form) {
    this._service.postUser(form.value).subscribe((user: User) => {
      this.user = user;
    });
  }

}
