import { useEffect } from 'react';
// @ts-ignore
import ScrollOut from 'scroll-out';

export const useAnimate = () => {
  useEffect(() => {
    ScrollOut({
      targets: '.rise-target',
      offset: 0,
      onShown: function (el: HTMLElement) {
        // // remove the class
        el.classList.remove('animate__fadeOutDown');
        el.classList.remove('hue-anima');

        // force reflow
        void el.offsetWidth;

        // re-add the animated cl
        el.classList.add('animate__fadeInUp');

        setTimeout(() => {
          el.classList.remove('animate__fadeInUp');
          el.classList.add('hue-anima');
        }, 2000);
      },
      // onHidden: function (el: HTMLElement) {
      //   // remove the class
      //   el.classList.remove('animate__fadeInUp');

      //   // force reflow
      //   void el.offsetWidth;

      //   // re-add the animated cl
      //   el.classList.add('animate__fadeOutDown');
      // },
    });
  }, []);
};
