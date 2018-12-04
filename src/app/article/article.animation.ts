import { animate, state, style, transition, trigger } from '@angular/animations';

export const ArticleAnimation = trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [style({ transform: 'translateX(-100%)' }), animate(500)]),
    transition('* => void', [animate(500, style({ transform: 'translateX(-100%)' }))]),
]);
