import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: User = new User;
  loading = false;
  errorMessage: string;

  constructor(private authenticationService: AuthenticationService,
    private router: Router ) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    console.log('register successfully');
    this.authenticationService.register(this.model)
      .subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.router.navigate(['/login'], { queryParams: { successMessage: 'User Added Successfully' } });
      },
      error => {
        console.log(error.json());
        this.errorMessage = error.json().errors[0].message;
        console.log(this.errorMessage);
        // this.alertService.error(error);
        this.loading = false;
      });
  }

}
