import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogPost, BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post implements OnInit {
  post: BlogPost | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.blogService.getPostById(id).subscribe({
      next: (post) => {
        if (!post) {
          this.error = true;
          this.loading = false;
          return;
        }

        this.post = post;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}

