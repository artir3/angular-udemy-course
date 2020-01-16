import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFeaching = false;
  error = null;

  constructor(private service: PostsService) { }

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.service.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFeaching = true;
    this.service.fetechPosts().subscribe(posts => {
      this.isFeaching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
      console.log(error)
    });
  }

  onClearPosts() {
    this.service.clearPosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }
}
