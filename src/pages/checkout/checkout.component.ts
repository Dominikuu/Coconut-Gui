import { Component, OnInit, ViewChild } from "@angular/core";
import { CheckoutInfoComponent } from "src/blocks/checkout-info/checkout-info.component";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  @ViewChild(CheckoutInfoComponent, { static: true })
  cartList: CheckoutInfoComponent;
  constructor() {}

  ngOnInit() {}
}
