import { Component } from '@angular/core';
import {SignInFormComponent} from '../../components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    SignInFormComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
