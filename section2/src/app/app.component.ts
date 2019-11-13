import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';
  showSecret = false;
  log =[];

  onToogleDisplay(){
    this.showSecret = !this.showSecret;
    this.log.push(new Date())
  }
}
