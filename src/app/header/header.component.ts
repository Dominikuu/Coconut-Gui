import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";

import { CookieService } from "angular2-cookie/core";

import { CartService } from "src/lib/service/cart.service";
import { Product } from "src/lib/service/product.service";
import {
  AuthenticationService,
  LandingType,
} from "src/lib/authenication.service";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";
export enum LoginWithSocial {
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  GITHUB = "Github",
}

@Component({
  selector: "ccn-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("landing", { static: false }) landingDiloag: TemplateRef<any>;

  form: FormGroup;

  products: Product[] = [];

  landingType: LandingType = LandingType.Login;

  isLoggedIn: boolean;

  user: SocialUser;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public cookieservice: CookieService,
    private socialAuthService: SocialAuthService
  ) {
    this.cartService.items$.subscribe((prod) => {
      this.products = prod;
    });
  }
  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      // this.authService.takeAuthAction(user, this.landingType);
    });
  }
  private setForm(): void {
    const formGroup =
      this.landingType === LandingType.Login
        ? {
            username: ["", Validators.required],
            password: ["", Validators.required],
          }
        : {
            email: ["", Validators.required],
            username: ["", Validators.required],
            password: ["", Validators.required],
          };
    this.form = this.formBuilder.group(formGroup);
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.landingDiloag);
    this.setForm();
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    this.authService.logStatus$.subscribe((logStatus) => {
      this.isLoggedIn = logStatus === "SUCESS";

      if (this.dialog && this.form.valid) {
        this.dialog.closeAll();
      }
    });
  }

  redirect(productId: string, slug: string) {
    this.router.navigate([`./cart/`]);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }
    const existed_account = this.form.value;
    this.authService.takeAuthAction(existed_account, this.landingType);
  }
  onSignup(): void {
    if (this.form.invalid) {
      return;
    }
    const new_account = this.form.value;
    this.authService.takeAuthAction(new_account, this.landingType);
  }

  onLogout(): void {
    this.authService.logout();
  }

  switchLandingType(landingType: LandingType) {
    this.landingType = landingType;
    this.setForm();
  }

  signInWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data) => {
        const { name, id, email } = data;
        const info = {
          username: name.replace(/\s+/g, ""),
          password: id,
          email,
        };
        this.authService.takeAuthAction(info, this.landingType);
        this.dialog.closeAll();
      });
  }

  signInWithFB(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data) => {
        const { name, id, email } = data;
        const info = {
          username: name.replace(/\s+/g, ""),
          password: id,
          email,
        };
        this.authService.takeAuthAction(info, this.landingType);
        this.dialog.closeAll();
      });
  }

  signInWithGithub(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
