import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ProductOnCart } from '@domain/product.model';
import { LocalRepository } from '@services/local.repository';

@Injectable({
  providedIn: 'root',
})
export class CartStore {
  #localRepository: LocalRepository = inject(LocalRepository);
  #state: WritableSignal<ProductOnCart[]> = signal<ProductOnCart[]>([]);

  state: Signal<ProductOnCart[]> = this.#state.asReadonly();

  cartCount = computed(() => this.#state().length);

  constructor() {
    this.setState(this.#localRepository.load('shopping-cart', []));

    effect(() => this.#localRepository.save('shopping-cart', this.#state()));
  }

  setState(cart: ProductOnCart[]): void {
    this.#state.set(cart);
  }
}
