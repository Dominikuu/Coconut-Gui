import { HttpClientModule } from "@angular/common/http";
import { InjectionToken, Injector, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { NgxsRouterPluginModule } from "@ngxs/router-plugin";
import { CookieService } from "angular2-cookie/core";
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";

import { MaterialSharedModule } from "src/material-shared.module";

import { environment } from "src/environments/environment";
import { TelemetryModule } from "src/lib/telemetry/telemetry.module";
import { AppRoutingModule } from "./app-routing.module";
import { CoconutApiModule } from "src/lib/service/api.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NotImplPage } from "./outlets/not-impl/not-impl.component";
import { FullWindowPage } from "./outlets/full-window/full-window.component";
import { WithHeaderPage } from "./outlets/with-header/with-header.component";
import { MasterPage } from "./outlets/master/master.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotImplPage,
    FullWindowPage,
    WithHeaderPage,
    MasterPage,
  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
    CoconutApiModule.forRoot(),
    TelemetryModule.forRoot(environment.GOOGLE_GA),
    AppRoutingModule,
  ],
  providers: [
    CookieService,
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "258999473738-vpok1cimae8029efk2b7guov59ij6e3h.apps.googleusercontent.com"
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("149156059064424"),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [MasterPage],
})
export class AppModule {}
