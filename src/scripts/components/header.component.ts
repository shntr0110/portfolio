import Alpine from 'alpinejs';

Alpine.data('header', () => {
  return {
    scrollY: 0,
    spMenuIsOpen: false,
    headerChange: document.querySelector('.headerChange'),

    init() {
      if (import.meta.env.MODE !== 'production') {
        console.log('init header component');
      }
    },

    get isScrolled(): boolean {
      if (!this.headerChange || !this.$root) return false;
      return this.scrollY > this.headerChange.clientHeight;
    },

    onScroll() {
      this.scrollY = window.scrollY;
    },
  };
});
