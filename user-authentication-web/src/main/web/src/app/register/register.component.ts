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

  private registerUrl = 'http://localhost:8080/users';

  user = {} as User;

  ngOnInit(): void {
  }

  register(form) {
    console.log(form.value);
    this._service.postUser(this.registerUrl, form.value).subscribe((user: User) => {
      this.user = user;
    });
  }

}
