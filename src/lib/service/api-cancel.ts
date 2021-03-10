import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ApiService } from "./api.service";

const AUTH_TOKEN = "x-auth-token";
const PRESERVED_API_CALL = "x-nebula-preserved-api-call";

export class CoconutApiCancelHttpInterceptor implements HttpInterceptor {
  constructor(private api: ApiService) {}

  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const authedApiCall = req.headers.get(AUTH_TOKEN) != null;
    const cancelableApiCall = req.headers.get(PRESERVED_API_CALL) !== "true";
    const request = next.handle(
      req.clone({ headers: req.headers.delete(PRESERVED_API_CALL) })
    );
    // return authedApiCall && cancelableApiCall
    //   ? request.pipe(takeUntil(this.api.onCancel()))
    //   : request;
    return request;
  }
}
