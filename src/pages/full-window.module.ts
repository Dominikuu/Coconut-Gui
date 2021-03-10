import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { MaterialSharedModule } from "src/material-shared.module";
import { BlockModule } from "src/blocks/block.module";

import { CartComponent } from "src/pages/cart/cart.component";
import { CheckoutComponent } from "src/pages/checkout/checkout.component";
import { HomeComponent } from "src/pages/home/home.component";
import { LoginComponent } from "src/pages/login/login.component";
import { ProductComponent } from "src/pages/product/product.component";
import { ProductDetailComponent } from "src/pages/product-detail/product-detail.component";
import { SharingComponent } from "src/pages/sharing/sharing.component";
import { SignupComponent } from "src/pages/signup/signup.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    HttpClientModule,

    BlockModule,

    MaterialSharedModule,

    // route
    RouterModule.forChild(routes),
  ],
})
export class FullWindowModule {}
