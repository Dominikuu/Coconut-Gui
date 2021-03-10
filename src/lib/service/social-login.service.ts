import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SocialUsers {
  provider: string;
  id: string;
  email: string;
  name: string;
  token?: string;
  idToken?: string;
}
export class SocialAuthService {
  url;
  constructor(private http: HttpClient) {}

  onSocialLogin(resp) {
    return this.http.post(this.url, resp);
  }
}
