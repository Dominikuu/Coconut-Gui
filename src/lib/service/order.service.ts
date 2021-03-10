import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "src/lib/service/api.service";
import { CookieService } from "angular2-cookie/core";
import { AuthenticationService } from "src/lib/authenication.service";
@Injectable({
  providedIn: "root",
})
export class OrderService {
  public order_url = environment.COCONUT_HOST.backend + "/orders/";

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {}

  public getTotal(): number {
    let total: number = 0;
    // this.order.products.forEach(p=>{
    //   total+=p.price*p.quantity;
    // });
    return total;
  }

  submitOrder(order_content): Observable<any> {
    return this.apiService.post(
      this.order_url + `order_create/`,
      Object.assign(order_content, { city: "Taipei" })
    );
  }

  // public getOrder(id: number): Observable<any> {
  //   return this.httpClient.get<any>(environment.COCONUT_HOST + "/orders/" + id);
  // }
}
