import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators' 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(next => {
    //   console.log(next?3:9)
    // })
    const customIntervalObservable = Observable.create((observer) => { 
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 6 ){
          observer.complete();

        }
        if (count > 10) {
          observer.error(new Error('Count >3!'));
        }
        count++;
      }, 1000);
    });
    this.firstObsSubscription = customIntervalObservable.pipe(
      filter((data: number) => {return data % 2 !==0}),
      map((data:number) => 'Round ' + (data +1)))
      .subscribe(v => {
      console.log(v);
    }, error => {
      console.log(error.message);
    }, () => {
      console.log('Completed observer')
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
