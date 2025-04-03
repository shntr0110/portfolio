import Alpine from 'alpinejs';

const name = 'lenis';

const store = {
  init() {
    if (import.meta.env.MODE !== 'production') {
      console.log('lenis store: init');
    }
  },
  instance: null,
};

Alpine.store(name, store);

declare module 'alpinejs' {
  interface Stores {
    [name]: typeof store;
  }
}
