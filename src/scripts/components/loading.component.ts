import Alpine from 'alpinejs';

Alpine.data('loading', () => {
  return {
    init() {
      if (import.meta.env.DEV) {
        console.log('init loading');
      }

      const body = document.body;

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const delay = isMobile ? 600 : 400;
      const remove = isMobile ? 900 : 1100;

      window.addEventListener('load', () => {
        setTimeout(() => {
          body.classList.add('load');
          setTimeout(() => {
            this.$el.remove();
          }, remove);
        }, delay);
      });
    },
  };
});
