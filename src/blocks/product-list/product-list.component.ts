import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { Product, ProductService } from "src/lib/service/product.service";

@Component({
  selector: "ccb-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  items: Product[] = [];
  filtering: string = "";
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe(
      (data) => {
        this.items = data.products;
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }

  redirect(productId: string, slug: string) {
    this.router.navigate([`./product/${productId}/${slug}/`]);
  }
}
