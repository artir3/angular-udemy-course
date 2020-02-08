import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(500)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange',
          borderRadius: '0px'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ]
      ),
      // therre is something go wrong, because it work to half step and then change immediately to new state
      // animate(500, style({
      //   borderRadius: '50px'
      // }))
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translate(-100px)'
        }),
        animate(300)]),
      transition('* => void', [
        animate(300), style({
          opacity: 0,
          transform: 'translate(100px)'
        })
      ]),
    ]),

  ]
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item: string) {
    const index = this.list.findIndex(it => it == item);
    this.list.splice(index, 1);
  }

  onAnimate() {
    this.state = this.state == 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState == 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }
}
