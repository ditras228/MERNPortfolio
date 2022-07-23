import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const modalAnimation = trigger('modalAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(10px)' }),
    animate('150ms', style({ transform: 'translateY(0)' })),
  ]),
]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('150ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('150ms', style({ opacity: 0 })),
  ]),
]);

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('60ms', animate('600ms ease-out', style({ opacity: 0.9 }))),
      ],
      { optional: true }
    ),
    query(':leave', animate('300ms', style({ opacity: 0 })), {
      optional: true,
    }),
  ]),
]);
