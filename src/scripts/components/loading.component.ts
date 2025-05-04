import Alpine from 'alpinejs';

Alpine.data('loading', () => {
  return {
    init() {
      if (import.meta.env.DEV) {
        console.log('init loading');
      }

      const body = document.body;

      window.addEventListener('load', () => {
        setTimeout(() => {
          body.classList.add('load');
          setTimeout(() => {
            this.$el.remove();
          }, 1000);
        }, 400);
      });
    },
  };
});
