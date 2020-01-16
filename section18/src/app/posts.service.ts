import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, catchError } from 'rxjs/operators'
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    this.http
      .post<{ name: string }>(environment.apiUrl, new Post(title, content))
      .subscribe(response => {
        console.log(response);
      }, error => this.error.next(error.message));
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
      }), catchError(err => {
        return throwError(err);
      }))

      
  }

  clearPosts() {
    return this.http.delete(environment.apiUrl);
  }
}
