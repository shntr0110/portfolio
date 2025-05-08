import Alpine from 'alpinejs';

Alpine.data('loading', () => {
  return {
    init() {
      if (import.meta.env.DEV) {
        console.log('init loading');
      }

      const body = document.body;

      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const delay = isMobile ? 700 : 600;
      const remove = isMobile ? 950 : 750;

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
