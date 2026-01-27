import {Component, inject, OnInit, Output} from '@angular/core';
import {Avatar} from "primeng/avatar";
import {AuthService} from '../../services/auth/auth.service';
import {resolve} from '@angular/compiler-cli';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    Avatar
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: any = null;

  authService = inject(AuthService)
  router = inject(Router)

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
  }

  logout() {
    this.authService.signOut().subscribe(
      () => {
        localStorage.removeItem("user");
        this.router.navigate(['/']);
      }
    );
  }

}
