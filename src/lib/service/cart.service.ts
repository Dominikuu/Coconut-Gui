import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "src/lib/service/api.service";
import { CookieService } from "angular2-cookie/core";
import { AuthenticationService } from "src/lib/authenication.service";

export type Cart = {};

@Injectable({
  providedIn: "root",
})
export class CartService {
  public cart_url = environment.COCONUT_HOST.backend + "/cart/";

  private itemsSubject = new BehaviorSubject<any[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private authService: AuthenticationService,
    private cookieService: CookieService
  ) {
    let existingCartItems = JSON.parse(localStorage.getItem("products"));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  updateProductToCart(cart): Observable<any> {
    return this.apiService.post(this.cart_url, cart);
  }

  getCartDetail(): Observable<any> {
    return this.apiService.get(this.cart_url);
  }

  addToCart(item: any) {
    // save to database
    if (this.authService.isLoggedIn()) {
      this.apiService
        .post(this.cart_url + `add_to_cart/`, item)
        .subscribe((resp) => {
          console.log(resp);
        });
    } else {
      // save to localstorage
      const existingCartItems =
        JSON.parse(localStorage.getItem("products")) || [];
      let altered_product = existingCartItems.find(function (_prod) {
        return _prod.id === item.id;
      });
      if (altered_product) {
        item.quantity += altered_product.quantity;
        altered_product = Object.assign(altered_product, item);
      } else {
        existingCartItems.push(item);
      }
      localStorage.setItem("products", JSON.stringify(existingCartItems));
      this.itemsSubject.next(existingCartItems);
    }
  }

  deleteCartItem(product_id: string) {
    if (this.authService.isLoggedIn()) {
      this.apiService
        .post(this.cart_url + `remove_from_cart/`, product_id)
        .subscribe((resp) => {
          console.log(resp);
        });
    } else {
      let existingCartItems =
        JSON.parse(localStorage.getItem("products")) || [];
      const altered_product = existingCartItems.filter(function (_prod) {
        return _prod.id !== product_id;
      });
      localStorage.setItem("products", JSON.stringify(altered_product));
      this.itemsSubject.next(altered_product);
    }
  }
  deleteAllCart() {
    localStorage.removeItem("products");
  }
}
