import {inject, Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from '@angular/fire/auth';
import {from} from 'rxjs';
import {GoogleAuthProvider} from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseAuth = inject(Auth)
  constructor() { }

  registerUser(email: string, password: string) {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
      (result) => {
        return result;
      }
    );
    return from(promise);
  }

  loginUser(email: string, password: string) {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
      (result) => {
        return result;
      }
    );
    return from(promise);
  }

  googleSignInAndSignOut() {
    const promise = signInWithPopup(this.firebaseAuth, new GoogleAuthProvider()).then(
      (res) => {
        return res;
      }
    );
    return from(promise);
  }

  signOut() {
    const promise = this.firebaseAuth.signOut().then(
      (res) => {
        return res;
      }
    );
    return from(promise);
  }

}
