import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [AppService],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _service: AppService) { }

  private registerUrl = 'http://localhost:8080/users';

  ngOnInit(): void {
  }

  register(form) {
    console.log(form.value);
    this._service.postResource(this.registerUrl, form.value)
  }

}
