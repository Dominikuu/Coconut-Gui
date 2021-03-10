import { Component, OnInit, ViewChild } from "@angular/core";

import { CartListComponent } from "src/blocks/cart-list/cart-list.component";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  @ViewChild(CartListComponent, { static: true }) cartList: CartListComponent;
  constructor() {}

  ngOnInit() {}
}
