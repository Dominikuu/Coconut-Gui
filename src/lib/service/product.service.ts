import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiService } from "src/lib/service/api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export type Product = {
  name: string;
  stock: number;
  id: string;
  slug: string;
  price: string;
  image: string;
  description: string;
};
@Injectable({
  providedIn: "root",
})
export class ProductService {
  public product_url = environment.COCONUT_HOST.backend + "/product/";

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getAllProduct(): Observable<any> {
    console.log(environment);
    return this.apiService.get(this.product_url);
  }
  addNewProduct(product_dto): Observable<any> {
    return this.apiService.post(this.product_url, product_dto);
  }

  singleProduct(id: string, slug: string) {
    return this.apiService.get(this.product_url + `${id}/${slug}/`);
  }
  updateProduct(id, product_dto): Observable<any> {
    return this.apiService.put(this.product_url + id, product_dto);
  }
  deleteProduct(id): Observable<any> {
    return this.apiService.delete(this.product_url + id);
  }
}
