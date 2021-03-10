import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CookieService } from "angular2-cookie/core";

import jwt_decode from "jwt-decode";
import * as moment from "moment";
// Api definition
import { Login } from "src/lib/api_definition/auth/login";
import {} from "src/lib/api_definition/auth/logout";
import { Register } from "src/lib/api_definition/auth/register";
// Service
import { ApiService } from "src/lib/service/api.service";
import { environment } from "../environments/environment";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}

export enum LandingType {
  Login = "LOGIN",
  Signup = "SIGNUP",
}

export enum LogStatus {
  LoginSuccess = "SUCESS",
  LoginFailed = "FAILED",
  UnAuth = "UNAUTH",
}

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  public headers = new HttpHeaders({
    "content-type": "application/json",
    "X-CSRFToken": this.cookieservice.get("csrftoken"),
  });
  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  // public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];

  private logStatusSubject = new BehaviorSubject<LogStatus>(LogStatus.UnAuth);

  logStatus$ = this.logStatusSubject.asObservable();

  constructor(
    private http: HttpClient,
    private cookieservice: CookieService,
    private socialAuth: SocialAuthService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    this.updateData(this.token);
  }

  setSession(token: string) {
    const payload = <JWTPayload>jwt_decode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem("token", token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem("token");
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http
      .post(
        environment.COCONUT_HOST.backend + "/api-token-refresh/",
        JSON.stringify({ token: this.token }),
        this.httpOptions
      )
      .subscribe(
        (data) => {
          this.updateData(data["token"]);
        },
        (err) => {
          this.errors = err["error"];
        }
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    this.logStatusSubject.next(LogStatus.UnAuth);
  }

  private updateData(token: string): void {
    if (!token) {
      return;
    }
    this.errors = [];
    this.setSession(token);
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    this.logStatusSubject.next(LogStatus.LoginSuccess);
  }

  isLoggedIn() {
    const exp = this.getExpiration();
    return moment().isBefore(exp);
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  login(user): void {
    let url: string = environment.COCONUT_HOST.backend + "/api-login-user/";
    this.http
      .post(url, user, {
        headers: this.httpOptions,
      })
      .subscribe(
        (data: string) => {
          const token: string = data;
          this.updateData(token);
        },
        (error) => {
          this.logStatusSubject.next(error);
        }
      );
  }

  register(user): void {
    let url: string = environment.COCONUT_HOST.backend + "/api-register-user/";
    console.log(this.headers);
    this.http
      .post(url, user, {
        headers: this.httpOptions,
      })
      .subscribe(
        (data: string) => {
          const token: string = data;
          this.updateData(token);
        },
        (error) => {
          this.logStatusSubject.next(error);
        }
      );
  }

  takeAuthAction(info, landingType: LandingType) {
    if (landingType === LandingType.Login) {
      this.login(info);
    }
    if (landingType === LandingType.Signup) {
      this.register(info);
    }
  }
}
