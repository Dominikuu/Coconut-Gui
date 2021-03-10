import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product, ProductService } from "src/lib/service/product.service";
import { CartService } from "src/lib/service/cart.service";

@Component({
  selector: "ccb-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.scss"],
})
export class ProductInfoComponent implements OnInit {
  product: Product;
  product_id: string;
  slug: string;
  quantity: number = 1;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.product_id = this.activeRouter.snapshot.params.productId;
    this.slug = this.activeRouter.snapshot.params.slug || "blue-o";
  }

  ngOnInit() {
    console.log(this.activeRouter.snapshot.params);
    this.getSingleProduct();
  }

  getSingleProduct() {
    this.productService.singleProduct(this.product_id, this.slug).subscribe(
      (data) => {
        this.product = data.product[0];
        console.log(this.product);
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }

  clickAddToCart() {
    this.cartService.addToCart({
      name: this.product.name,
      product_id: this.product_id,
      slug: this.slug,
      quantity: this.quantity,
      unit_price: parseInt(this.product.price, 10),
      total_price: parseInt(this.product.price, 10) * this.quantity,
    });
  }

  clickBuyNow() {
    this.clickAddToCart();
    this.router.navigate([`./cart`]);
  }
}
