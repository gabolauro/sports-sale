import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NULL_PRODUCT, Product } from '@domain/product.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  #apiUrl = 'http://localhost:3000/productos';
  #http = inject(HttpClient);

  // * Public methods division

  /**
   * Get all products from the API
   * @returns An observable with the products
   */
  getAllProducts$(): Observable<Product[]> {
    return this.#http.get<Product[]>(this.#apiUrl);
  }

  /**
   * Get an product by its id from the API
   * @param id The id of the product to get
   * @returns An observable with the product or NULL_PRODUCT if not found
   */
  getProductsByCategory$(id: number | undefined): Observable<Product[]>  {
    if (!id) return of([NULL_PRODUCT]);
    const url = `${this.#apiUrl}?categoria_id=${id}`;
    return this.#http.get<Product[]>(url).pipe(
      map((products) => products || [NULL_PRODUCT]),
      catchError((error) => {
        console.error('Error getting product', error);
        return of([NULL_PRODUCT]);
      }),
    );
  }

  /**
   * Create a new product in the API
   * @param product The product to create
   * @returns An observable with the created product
   */
  putProduct$(product: Product) {
    const url = `${this.#apiUrl}/${product.id}`;
    return this.#http.put<Product>(url, product).pipe(
      catchError((error) => {
        console.error('Error updating product', error);
        return throwError(() => new Error(error));
      }),
    );
  }
}