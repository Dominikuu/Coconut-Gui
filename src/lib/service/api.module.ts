import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { CoconutApiCancelHttpInterceptor } from "./api-cancel";
import { ApiProvider } from "./api.provider";
import { ApiService } from "./api.service";
import { AuthenticationService } from "../authenication.service";
import { SocialAuthService } from "angularx-social-login";
import { AuthGuard } from "../authenication.guard";

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class CoconutApiModule {
  static forRoot(): ModuleWithProviders<CoconutApiModule> {
    return {
      ngModule: CoconutApiModule,
      providers: [
        // api provider
        ApiProvider,
        // api service
        ApiService,
        // cancel interceptor
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: CoconutApiCancelHttpInterceptor,
        //   deps: [ApiService],
        //   multi: true,
        // },
        AuthenticationService,
        SocialAuthService,
        CookieService,

        AuthGuard,
      ],
    };
  }
}
