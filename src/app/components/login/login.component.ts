import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  errorMessage: string;
  successMessage: string;

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.successMessage = this.route.snapshot.queryParams['successMessage'] || null;
  }

  login() {
    this.loading = true;
    console.log('login successfully');
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.router.navigate(['/home']);
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
