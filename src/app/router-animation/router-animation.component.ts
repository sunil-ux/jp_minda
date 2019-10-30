import { trigger, state, animate, style, transition } from '@angular/animations';

// Post by Gerard Sans: https://medium.com/google-developer-experts/angular-2-animate-router-transitions-6de179e00204#.7h2femijg
// Add <script src="https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js"></script> into index.html for polyfill
// Add the following to any component to animate the view
// import { routerTransition } from './router.animations';
// @Component({
//   selector: 'home',
//   template: `<h1>Home</h1>`,
//   animations: [routerTransition()],
//   host: {'[@routerTransition]': ''}
// })
export function routerTransition() {
  return slideToLeft();
}

export function slideToRight() {
  return trigger('routerTransition', [
    state('void', style({position: '', width: ''}) ),
    state('*', style({position: '', width: ''}) ),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

export function slideToLeft() {
  return trigger('routerTransition', [
    state('void', style({position: '', width: ''}) ),
    state('*', style({position: '', width: ''}) ),
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

export function slideToBottom() {
  return trigger('routerTransition', [
    state('void', style({position: '', width: '', height: ''}) ),
    state('*', style({position: '', width: '', height: ''}) ),
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
    ])
  ]);
}

export function slideToTop() {
  return trigger('routerTransition', [
    state('void', style({position: '', width: '', height: ''}) ),
    state('*', style({position: '', width: '', height: ''}) ),
    transition(':enter', [
      style({transform: 'translateY(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
    ])
  ]);
}