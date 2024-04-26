import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderStore } from './header.store';
import { CartStore } from 'src/app/shared/states/cart.store';

@Component({
  selector: 'ss-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  #header = inject(HeaderStore);
  #cart = inject(CartStore);

  cartCount = this.#cart.cartCount;


  constructor() {
    // effect(() => {
    //   console.log(this.products());
    // });
    
  }

  toggle(): void {
    this.#header.setToggle(!this.#header.toggle());
  }
}
