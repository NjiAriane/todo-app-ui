import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-google-auth-button',
  imports: [],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.css'
})
export class GoogleAuthComponent {
  constructor(private router: Router, private authService: AuthService) {
  }

  signIn(): void {
    this.authService.googleSignInAndSignOut().subscribe(
      (res: any) => {
        const user: any = res.user;
        localStorage.setItem('user', JSON.stringify({email: user.email, ...user?.stsTokenManager}));
        this.router.navigate(['/dashboard']);
      }
    )
  }
}
