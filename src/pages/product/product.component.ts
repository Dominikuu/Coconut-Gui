import { Component, OnInit, ViewChild } from "@angular/core";

import { ProductListComponent } from "src/blocks/product-list/product-list.component";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  @ViewChild(ProductListComponent, { static: true })
  productList: ProductListComponent;
  constructor() {}

  ngOnInit() {}
}
