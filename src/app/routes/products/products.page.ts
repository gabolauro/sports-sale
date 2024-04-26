import { ChangeDetectionStrategy, Component, InputSignal, Signal, computed, effect, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, map, switchMap } from 'rxjs';
import { NULL_PRODUCT, Product, ProductOnCart } from '@domain/product.model';
import { ProductsApi } from '@api/products.api';
import { NULL_SPORT, Sport } from '@domain/sport.model';
import { SportsApi } from '@api/sports.api';
import { CartStore } from 'src/app/shared/states/cart.store';

@Component({
  selector: 'ss-products',
  standalone: true,
  imports: [],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProductsPage {
  #productsApi$ = inject(ProductsApi)
  #sportApi$ = inject(SportsApi)
  #cart = inject(CartStore);

  id: InputSignal<number> = input.required<number>();
  id$: Observable<number> = toObservable(this.id);
  products$: Observable<Product[]> = this.id$.pipe(
    switchMap((id: number) => {
      return this.#productsApi$.getProductsByCategory$(id);
    }),
    map((products: Product[]) => products),
  );
  products: Signal<Product[]> = toSignal(this.products$, { initialValue: [] });


  sport$: Observable<Sport> = this.id$.pipe(
    switchMap((id: number) => {
      return this.#sportApi$.getCategoryBy$(id);
    }),
    map((products: Sport) => products),
  );
  sport: Signal<Sport> = toSignal(this.sport$, { initialValue: NULL_SPORT });

  addToCart(product: Product): void {
    const cart: ProductOnCart[] = this.#cart.state();
    let productToUpdate: ProductOnCart | undefined 
    
    if (cart.some((c) => c.id == product.id)) {
      productToUpdate = cart?.find((c) => c.id == product.id);
      if (productToUpdate) {
        productToUpdate.stock--;
        productToUpdate.count++;
      }
      this.#cart.setState([ ...cart ]);
    } else {
      productToUpdate = { ...product, stock: product.stock-1, count: 1 }
      this.#cart.setState([ ...cart, productToUpdate ]);
    }

    const updateStock = this.products().find((p) => p.id == product.id);
    if (updateStock) {
      updateStock.stock--;
      this.updateProduct(updateStock);
    }
  }

  updateProduct(updatedProduct: Product) {
    this.#productsApi$.putProduct$(updatedProduct).subscribe({
      next: () => {
        this.#productsApi$.getProductsByCategory$(this.id()).subscribe((products) => {
          this.products = signal<Product[]>(products);
        });
      },
      error: (error) => console.error('Error creating booking', error),
    });
  }
}

