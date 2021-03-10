import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialSharedModule } from "src/material-shared.module";
import { ProductListComponent } from "./product-list/product-list.component";
import { CartListComponent } from "./cart-list/cart-list.component";
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { LogInFormComponent } from "./log-in-form/log-in-form.component";
import { CatagoryComponent } from "./catagory/catagory.component";
import { CheckoutInfoComponent } from "./checkout-info/checkout-info.component";
import { ProductInfoComponent } from "./product-info/product-info.component";
const Blocks = [
  ProductListComponent,
  CartListComponent,
  LogInFormComponent,
  SignUpFormComponent,
  CatagoryComponent,
  CheckoutInfoComponent,
  ProductInfoComponent,
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    RouterModule,
  ],
  declarations: Blocks,
  exports: Blocks,
})
export class BlockModule {}
