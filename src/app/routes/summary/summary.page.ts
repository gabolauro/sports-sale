import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { ProductsApi } from '@api/products.api';
import { Product, ProductOnCart } from '@domain/product.model';
import { CartStore } from 'src/app/shared/states/cart.store';

@Component({
  selector: 'ss-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.page.html',
  styleUrl: './summary.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SummaryPage {
  #productsApi$ = inject(ProductsApi)
  #cart = inject(CartStore);
  productsOnCart: Signal<ProductOnCart[]> = this.#cart.state;

  subTotal: Signal<number> = computed(() => {
    let total = 0;
    this.productsOnCart().forEach(product => {
      total += product.precio * product.count;
    });
    return total;
  });

  deliveryTotal: Signal<number> = computed(() => {
    if (this.productsOnCart().length == 0) return 0;
    return this.subTotal() > 100
      ? 0
      : this.subTotal() > 50
      ? 5
      : 10;
  });

  total: Signal<number> = computed(() => {
    return this.subTotal() + this.deliveryTotal();
  });

  getUnitTotal(product: ProductOnCart): string {
    return (product.precio * product.count).toFixed(2);
  }

  removeFromCart(product: ProductOnCart): void {
    const cart: ProductOnCart[] = this.#cart.state();
    const updatedCart = cart.filter((p) => p.id != product.id);
    this.#cart.setState(updatedCart);

    const updateStock: Product = {
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      categoria_id: product.categoria_id,
      precio: product.precio,
      stock: product.stock + product.count
    }
    this.restoreProduct(updateStock);
  }

  restoreProduct(updatedProduct: Product) {
    this.#productsApi$.putProduct$(updatedProduct).subscribe({
      next: () => {
        console.info('product updated');
      },
      error: (error) => console.error('Error creating booking', error),
    });
  }

}
