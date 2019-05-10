import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { LocalStorageService } from './localstorage.service';
import { UserModel } from '../models/user.model';
import { UserRegistrationModel } from '../models/user-registration.model';
import { UserLoginModel } from '../models/user-login.model';

@Injectable()
export class AuthService {

  public userData: UserModel;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private localStorage: LocalStorageService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.localStorage.setData('user', this.userData);
        this.localStorage.getData('user');
      } else {
        this.localStorage.setData('user', null);
        this.localStorage.getData('user');
      }
    })
  }

  public setUserData(user: UserModel) {
    try {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData: UserModel = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      }
      return userRef.set(userData, {
        merge: true
      })
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  public async  signUp(user: UserRegistrationModel) {
    let newUser = user;
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password);
      let userSave = new UserModel();
      userSave = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: user.name,
        emailVerified: false,
      }
      await this.setUserData(userSave);
      await this.sendVerificationMail();
      
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  public async  sendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
  }

  public async forgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    }
    catch (error) {
      window.alert(error);
    }
  }

  public isLoggedIn(): boolean {
    const user: UserModel = this.localStorage.getData('user');
    return (user !== null && user.emailVerified !== false);
  }

  public googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  private async authLogin(provider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.setUserData(result.user);
    }
    catch (error) {
      window.alert(error);
    }
  }

  public async signIn(user: UserLoginModel) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      this.setUserData(result.user);
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.clear;
  }
}
