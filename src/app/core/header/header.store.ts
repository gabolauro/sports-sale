import {
    Injectable,
    Signal,
    WritableSignal,
    computed,
    effect,
    inject,
    signal,
  } from '@angular/core';
  
  @Injectable({
    providedIn: 'root',
  })
  export class HeaderStore {
    #toggle = signal<boolean>(true);
    toggle: Signal<boolean> = this.#toggle.asReadonly();

  
    setToggle(toggle: boolean): void {
      this.#toggle.set(toggle);
    }
  }