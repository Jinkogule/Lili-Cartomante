import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogPost, BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  posts = signal<BlogPost[]>([]);
  postsError = signal(false);

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.loadRecentPosts(20);
    this.posts = this.blogService.posts;
    this.postsError = this.blogService.postsError;
  }

  trackByPost(_: number, post: BlogPost) {
    return post.id;
  }
}

