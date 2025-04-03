import Alpine from 'alpinejs';
import Lenis from 'lenis';

Alpine.data('scroll', () => {
  let requestId: number;

  return {
    scrollDirection: true,
    init() {
      if (import.meta.env.MODE !== 'production') {
        console.log('init scroll component');
      }
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        infinite: false,
      });

      //get scroll value
      lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        this.scrollDirection = scroll > 200 && direction !== -1;
      });

      function raf(time: number) {
        lenis.raf(time);

        if (requestId) cancelAnimationFrame(requestId);
        requestId = requestAnimationFrame(raf);
      }

      requestId = requestAnimationFrame(raf);

      // @ts-expect-error: lenis instance may be null or undefined
      this.$store.lenis.instance = lenis;
    },
  };
});
