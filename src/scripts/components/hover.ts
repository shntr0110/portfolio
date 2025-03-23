import Alpine from 'alpinejs';

Alpine.data('hover', () => {
  return {
    isOver: false,
    isPlaying: false,
    isTouchDevice: false,

    init() {
      if (import.meta.env.MODE !== 'production') {
        console.log('init hover component');
      }

      this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      if (this.isTouchDevice) {
        console.log('Touch device detected, hover functionality disabled');
        return;
      }

      window.addEventListener('pageshow', () => {
        console.log('rollLeave');
        this.rollLeave();
      });
    },

    rollEnter() {
      if (this.isTouchDevice) return;
      this.isOver = true;

      if (this.isPlaying) {
        return;
      }

      this.startRollEnter(this.$el);
    },

    rollLeave() {
      if (this.isTouchDevice) return;
      this.isOver = false;

      if (this.isPlaying) {
        return;
      }

      this.startRollLeave(this.$el);
    },

    startRollEnter(target: HTMLElement) {
      if (this.isTouchDevice) return;
      this.isPlaying = true;

      const duration = Number(target.dataset.enterTime);

      target.classList.add('is-hover');

      setTimeout(() => {
        this.endRollEnter();
      }, duration);
    },

    startRollLeave(target: HTMLElement) {
      if (this.isTouchDevice) return;
      target.classList.add('is-leaving');

      this.isPlaying = true;

      const duration = Number(target.dataset.leaveTime);
      target.classList.remove('is-hover');

      setTimeout(() => {
        target.classList.remove('is-leaving');
        this.endRollLeave(target);
      }, duration);
    },

    endRollEnter() {
      if (this.isTouchDevice) return;
      this.isPlaying = false;

      if (this.isOver) {
        return;
      }

      this.startRollLeave(this.$el);
    },

    endRollLeave(target: HTMLElement) {
      if (this.isTouchDevice) return;
      this.isPlaying = false;

      if (!this.isOver) {
        return;
      }

      this.startRollEnter(this.$el);
    },
  };
});
