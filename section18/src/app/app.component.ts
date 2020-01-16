import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit() { 
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(environment.apiUrl, postData)
      .subscribe(response => {
        console.log(response);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.http.get(environment.apiUrl)
      .pipe(map(responseData => {
        const posts = [];
        for(let key in responseData) {
          if (responseData.hasOwnProperty(key)){
            posts.push({ ...responseData[key], id: key });
          }
        };
        return posts;
      }))
      .subscribe(post => {
      console.table(post);
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
