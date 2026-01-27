import { Component } from '@angular/core';
import {SignInFormComponent} from '../../components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-up',
  imports: [
    SignInFormComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
