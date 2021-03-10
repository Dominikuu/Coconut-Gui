import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";

import { ApiRequest, UrlFormatter, ApiResponse } from "./api.struct";

export module NebulaHeaders {
  export const AUTH_TOKEN = "x-auth-token";
  export const SESSION_EXPIRY = "x-nebula-session-expiry";
  export const RENEW_SESSION_EXPIRY = "x-auth-renew";
  export const REFER_PAGE = "x-refer-page";
  export const SKIP_PRIVILEGE_REDIRECT = "x-nebula-skip-privilege-redirect";
  export const PRESERVED_API_CALL = "x-nebula-preserved-api-call";
}

/**
 * This provider will send requests to backend.
 */
@Injectable()
export class ApiProvider {
  protected authToken: string | null;

  constructor(private http: HttpClient, private cookieservice: CookieService) {
    this.authToken = null;
  }

  /**
   * Set auth-token to provider (after login)
   * @param authToken Authentication Token
   */
  setAuthToken(authToken: string) {
    this.authToken = authToken;
  }

  /**
   * Clear auth-token from provider (after logout)
   * @returns Previous AuthToken exists or not.
   */
  clearAuthToken() {
    const previousToken = this.authToken;
    this.authToken = null;
    return previousToken ? true : false;
  }

  /**
   * Prepare Http-Header for each request
   * @param request the request will be made
   * @returns HTTP-Headers Object
   */
  protected prepareHeaders(request: ApiRequest<any>): HttpHeaders {
    let headers = new HttpHeaders({
      // "Content-Type": "application/json, text/plain",
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Credentials": "true",
      // "Access-Control-Allow-Headers":
      //   "Access-Control-Allow-Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE, OPTION",
      withCredentials: "true",
    });

    if (this.authToken != null) {
      headers = headers.append(NebulaHeaders.AUTH_TOKEN, this.authToken);
      headers = headers.append(
        NebulaHeaders.RENEW_SESSION_EXPIRY,
        request.renewSession === false ? "false" : "true"
      );
    }
    if (this.authToken != null && request.skipPrivilegeRedirect === true) {
      headers = headers.append(NebulaHeaders.SKIP_PRIVILEGE_REDIRECT, "true");
      request.preserved = true;
    }
    if (request.preserved === true) {
      headers = headers.append(NebulaHeaders.PRESERVED_API_CALL, "true");
    }
    headers = headers.append(NebulaHeaders.REFER_PAGE, request.page || "/");
    return headers;
  }

  /**
   * Interpolate URL patter to actual URL.
   * @param request request
   * @returns URL to call
   */
  protected resolveUrl(request: ApiRequest<any>): string {
    const params = request.params || {};
    const url = request.apiRef.url;
    return `${environment.COCONUT_HOST.backend}/${url}`;
  }

  /**
   * Fetch response based on request
   * @param request to fetch
   * @returns API response
   */
  protected httpRequest(
    request: ApiRequest<any>
  ): Observable<HttpResponse<any>> {
    const resp$ = this.http.request(
      request.apiRef.method,
      this.resolveUrl(request),
      {
        body: request.body,
        headers: this.prepareHeaders(request),
        observe: "response",
        responseType: request.apiRef.responseType || "json",
        withCredentials: true,
      }
    );
    return resp$;
  }
  /**
   * Make a packed request
   * @param request Request to get
   * @returns API Response
   */
  packedRequest<T, R>(request: ApiRequest<T>): Observable<ApiResponse<R>> {
    const resp$ = this.httpRequest(request).pipe(
      map<HttpResponse<any>, ApiResponse<R>>((resp) => {
        return {
          page: request.page,
          identity: request.identity,
          status: resp.body ? resp.body.status : resp.status,
          message: resp.body ? resp.body.message : null,
          body: resp.body ? resp.body.body : null,
        };
      })
    );
    return resp$;
  }
}
