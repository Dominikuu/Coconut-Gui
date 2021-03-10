import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "src/lib/service/cart.service";
export interface ProductRow {
  id: string;
  image: string;
  name: string;
  quantity: number;
  removeable: boolean;
  price: number;
  total_price: number;
}

export enum Column {
  Image = "image",
  ProductName = "name",
  Quantity = "quantity",
  Removeable = "removeable",
  UnitPrice = "price",
  TotalPrice = "total_price",
}

@Component({
  selector: "ccb-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"],
})
export class CartListComponent implements OnInit {
  displayedColumns: string[] = [
    Column.Image,
    Column.ProductName,
    Column.Quantity,
    Column.UnitPrice,
    Column.TotalPrice,
    Column.Removeable,
  ];
  dataSource: ProductRow[] = [];
  cartTotalPrice: any;
  constructor(private cartService: CartService, private router: Router) {
    this.cartService.items$.subscribe((prod) => {
      this.dataSource = this.setProductRow(prod);
      this.getCartDetailsByUser();
    });
  }

  ngOnInit() {
    this.cartService.getCartDetail().subscribe((resp) => {
      this.dataSource = this.setProductRow(resp);
    });
  }

  setProductRow(prod) {
    return prod.map((prd) => {
      return Object.assign(prd, { total_price: prd.quantity * prd.price });
    });
  }

  getTotalAmounOfTheCart() {
    let totalPrice = 0;
    for (const o of this.dataSource) {
      totalPrice = totalPrice + o.price * o.quantity;
    }
    return totalPrice.toFixed(2);
  }

  getCartDetailsByUser() {
    this.cartTotalPrice = this.getTotalAmounOfTheCart();
    this.dataSource = this.setProductRow(this.dataSource);
  }

  qtyChange(event: string, id: string) {
    const product = this.dataSource.find(function (_prod) {
      return _prod.id === id;
    });
    product.id = id;
    product.quantity = parseInt(event, 10);
    this.cartService.addToCart(product);
    this.getCartDetailsByUser();
  }

  deleteCartItem(id: string) {
    this.cartService.deleteCartItem(id);
    this.getCartDetailsByUser();
  }

  redirectTo(page: string) {
    this.router.navigate([`./${page}/`]);
  }

  handleMinus(id: any) {
    const product = this.dataSource.find(function (_prod) {
      return _prod.id === id;
    });
    product.id = id;
    product.quantity -= 1;
    this.cartService.addToCart(product);
    this.getCartDetailsByUser();
  }
  handlePlus(id: any) {
    const product = this.dataSource.find(function (_prod) {
      return _prod.id === id;
    });
    product.id = id;
    product.quantity += 1;
    this.cartService.addToCart(product);
    this.getCartDetailsByUser();
  }
}
