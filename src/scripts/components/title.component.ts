import Alpine from 'alpinejs';

Alpine.data('title', () => {
  return {
    init() {
      if (import.meta.env.DEV) {
        console.log('init title');
      }

      window.addEventListener('load', () => {
        this.$el.classList.add('active');
      });
    },
  };
});
