import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductInfoComponent } from "src/blocks/product-info/product-info.component";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  @ViewChild(ProductInfoComponent, { static: true })
  productInfo: ProductInfoComponent;
  constructor() {}

  ngOnInit() {}
}
