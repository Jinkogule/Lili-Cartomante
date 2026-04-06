import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogPost, BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  posts = signal<BlogPost[]>([]);
  postsError = signal(false);

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.loadRecentPosts(3);
    this.posts = this.blogService.posts;
    this.postsError = this.blogService.postsError;
  }
}

