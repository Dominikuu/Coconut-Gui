import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { MaterialSharedModule } from "src/material-shared.module";
import { BlockModule } from "src/blocks/block.module";

import { CartComponent } from "src/pages/cart/cart.component";
import { CheckoutComponent } from "src/pages/checkout/checkout.component";
import { ProductComponent } from "src/pages/product/product.component";
import { ProductDetailComponent } from "src/pages/product-detail/product-detail.component";
import { SharingComponent } from "src/pages/sharing/sharing.component";

const routes: Routes = [
  { path: "", redirectTo: "/product", pathMatch: "full" },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },
  {
    path: "product",
    component: ProductComponent,
  },
  {
    path: "product/:productId/:slug",
    component: ProductDetailComponent,
  },
  {
    path: "sharing",
    component: SharingComponent,
  },
];

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    ProductComponent,
    ProductDetailComponent,
    SharingComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    BlockModule,

    MaterialSharedModule,

    // route
    RouterModule.forChild(routes),
  ],
})
export class WithHeaderModule {}
