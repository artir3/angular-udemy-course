import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, catchError, tap } from 'rxjs/operators'
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
      .post<{ name: string }>(
        environment.apiUrl, 
        new Post(title, content), 
        {
          observe: 'response'
        }
      )
      .subscribe(response => {
        console.log(response);
      }, error => this.error.next(error.message));
  }

  fetechPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      // params: new HttpParams()
      //   .set('print', 'pretty')
      params: searchParams
    }
    return this.http.get<{ [key: string]: Post }>(environment.apiUrl, headers)
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
    return this.http.delete(environment.apiUrl, {
      observe: 'events'
    }).pipe(tap(event => {
      console.log(event)
      if (event.type === HttpEventType.Sent) {
        // ...
      } else if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}
