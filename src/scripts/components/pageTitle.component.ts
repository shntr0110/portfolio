import Alpine from 'alpinejs';

Alpine.data('pageTitle', () => {
  return {
    init() {
      if (import.meta.env.DEV) {
        console.log('init pageTitle');
      }

      window.addEventListener('load', () => {
        this.$el.classList.add('active');
      });
    },
  };
});
