import { style, animate, trigger, transition } from '@angular/animations';
export const fadeSlideInOutAnimation = trigger('fadeSlideInOut', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(30px)'
      }),
      animate('1s', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
    ]),
    transition(':leave', [
      animate('1s', style({
        opacity: 0,
        transform: 'translateY(30)'
      })),
    ]),
  ]);