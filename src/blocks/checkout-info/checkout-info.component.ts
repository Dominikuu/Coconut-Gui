import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrderService } from "src/lib/service/order.service";
import { AuthenticationService } from "src/lib/authenication.service";
import { CartService } from "src/lib/service/cart.service";

@Component({
  selector: "ccb-checkout-info",
  templateUrl: "./checkout-info.component.html",
  styleUrls: ["./checkout-info.component.scss"],
})
export class CheckoutInfoComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  orders: any = [
    { description: "al;kdsufpu31209u", price: 30 },
    { description: "al;kdsufpu31209u", price: 50 },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ["Dominique", Validators.required],
      last_name: ["Chen", Validators.required],
      email: ["alanccl92@hotmail.com", Validators.required],
      address: ["xinyi strict", Validators.required],
      postal_code: ["110", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const $this = this;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    return this.orderService.submitOrder(this.form.value).subscribe((res) => {
      $this.loading = false;
      this.cartService.deleteAllCart();
    });
  }
}
