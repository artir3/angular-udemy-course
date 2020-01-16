import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFeaching = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(environment.apiUrl, postData)
      .subscribe(response => {
        console.log(response);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.isFeaching = true;
    this.http.get<{ [key: string]: Post }>(environment.apiUrl)
      .pipe(map(responseData => {
        const posts: Post[] = [];
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            posts.push({ ...responseData[key], id: key });
          }
        };
        return posts;
      }))
      .subscribe(post => {
        this.loadedPosts = post;
        this.isFeaching = false;
      });
  }

  onClearPosts() {
    // Send Http request
  }
}
