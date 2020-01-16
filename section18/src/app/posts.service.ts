import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    this.http
      .post<{ name: string }>(environment.apiUrl, new Post(title, content))
      .subscribe(response => {
        console.log(response);
      })
  }

  fetechPosts() {
    return this.http.get<{ [key: string]: Post }>(environment.apiUrl)
      .pipe(map(responseData => {
        const posts: Post[] = [];
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            posts.push({ ...responseData[key], id: key });
          }
        };
        return posts;
      }))
  }

  clearPosts() {
    return this.http.delete(environment.apiUrl);
  }
}
