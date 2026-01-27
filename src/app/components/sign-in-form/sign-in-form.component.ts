import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {GoogleAuthComponent} from '../google-auth/google-auth.component';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    GoogleAuthComponent
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent implements OnInit {

  @Input()
  formType: string = 'sign-in';

  @Input()
  title: string = '';

  @Input()
  buttonLabel: string = 'Sign in';

  @Input()
  footerText: string = 'Do not have an account?';

  @Input()
  footerLinkText: string = 'Sign up';

  @Input()
  footerLinkRoute: string = '/sign-up';

  signInForm: any;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    if (this.signInForm.valid) {
      if (this.formType === 'sign-in') {
        this.authService.loginUser(this.signInForm.value.email, this.signInForm.value.email).subscribe(
          (res) => {
            const user: any = res.user;
            localStorage.setItem('user', JSON.stringify({email: user.email, ...user?.stsTokenManager}));
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error logging in', error);
          }
        );
      } else {
        this.authService.registerUser(this.signInForm.value.email, this.signInForm.value.password).subscribe(
          (res) => {
            const user: any = res.user;
            localStorage.setItem('user', JSON.stringify({email: user.email, ...user?.stsTokenManager}));
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error registering', error);
          }
        );
      }

    } else {
      console.log('Form is invalid');
    }
  }

}
