import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPosts } from 'src/app/interfaces/Posts';
@Component({
  selector: 'app-posts-detail-page',
  templateUrl: './posts-detail-page.component.html',
  styleUrls: ['./posts-detail-page.component.scss'],
})
export class PostsDetailPageComponent {
  post!: IPosts;
  constructor(
    private postService: PostsService,
    private router: ActivatedRoute,
    private redirect: Router
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');

      this.postService.getPost(id!).subscribe(
        (data) => {
          this.post = data.post;
          console.log(this.post);
        },
        () => {
          alert("Couldn't find this post.Please try again😥😥");
          this.redirect.navigate(['/']);
        }
      );
    });
  }
}
