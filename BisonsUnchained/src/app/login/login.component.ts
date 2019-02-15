import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  Message: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private AccServ: AccountService, private router: Router) {
    this.Message = fb.group({
      name: this.name,
      password: this.password
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.Message.valid && this.AccServ.login(this.name.value, this.password.value)) {
      this.router.navigate(['/hunter']);
    } else {
      alert('Try again!');
      this.Message.reset();
    }
  }

  Register() {
    alert('Currently not supported!');

  }
}
