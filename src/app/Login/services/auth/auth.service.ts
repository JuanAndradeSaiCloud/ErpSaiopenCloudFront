import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUtils } from '../../auth.utils';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated: boolean = false;

  /**
   * Constructor
   */
  constructor(
      private _httpClient: HttpClient,
      private _userService: UserService,
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string)
  {
      localStorage.setItem('accessToken', token);
  }

  get accessToken(): string
  {
      return localStorage.getItem('accessToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any>
  {
      return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any>
  {
      return this._httpClient.post('api/auth/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
    signIn(credentials: { email: string; password: string }): Observable<any>{
        if ( this._authenticated ){
          return throwError('User is already logged in.');
        }
        let tenant, username;
        try {
          const parts = credentials.email.split('@');
          if (parts.length === 2) {
             username= parts[0];
             tenant = parts[1].split('.')[0];
          } else {
            throw new Error('Email address is not in the expected format');
          }
        } catch (error) {
          console.error('An error occurred:', error.message);
          // Aquí puedes manejar el error de acuerdo a tus necesidades.
        }
        const loginCredentials = {"username":username, "password": credentials.password}

      const urlLogin =  `${environment.HTTP}${tenant}.${environment.URL_ROOT}:${environment.PORT}/api/token/`
      //`http://${tenant}.saiopencloud.com.co:8000/api/token/`
      return this._httpClient.post(urlLogin, loginCredentials).pipe(
          switchMap((response: any) =>
          {
            console.log('dd');
            
              // Store the access token in the local storage
              this.accessToken = response.access;

              // Set the authenticated flag to true
              this._authenticated = true;

              // Store the user on the user service
              this._userService.user = {"id":'1', "name":"admin","email":credentials.email, "tenant":"test"};
              localStorage.setItem('user', JSON.stringify({"id":'1', "name":"admin","email":credentials.email, "tenant":"test"}));  
              // Return a new observable with the response
              return of(response);
          }),
      );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any>
  {
      // Sign in using the token
      return this._httpClient.post('api/auth/sign-in-with-token', {
          accessToken: this.accessToken,
      }).pipe(
          catchError(() =>

              // Return false
              of(false),
          ),
          switchMap((response: any) =>
          {
              // Replace the access token with the new one if it's available on
              // the response object.
              //
              // This is an added optional step for better security. Once you sign
              // in using the token, you should generate a new one on the server
              // side and attach it to the response object. Then the following
              // piece of code can replace the token with the refreshed one.
              if ( response.accessToken )
              {
                  this.accessToken = response.accessToken;
              }

              // Set the authenticated flag to true
              this._authenticated = true;

              // Store the user on the user service
              this._userService.user = response.user;

              // Return true
              return of(true);
          }),
      );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any>
  {
      // Remove the access token from the local storage
      localStorage.removeItem('accessToken');

      // Set the authenticated flag to false
      this._authenticated = false;

      // Return the observable
      return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
  {
      return this._httpClient.post('api/auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any>
  {
      return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean>
  {
      // Check if the user is logged in
      if ( this._authenticated )
      {
          return of(true);
      }

      // Check the access token availability
      if ( !this.accessToken )
      {
          return of(false);
      }

      // Check the access token expire date
      if ( AuthUtils.isTokenExpired(this.accessToken) )
      {
          return of(false);
      }

      // If the access token exists, and it didn't expire, sign in using it
      return this.signInUsingToken();
  }
}
