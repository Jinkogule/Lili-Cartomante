import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface BlogPost {
  id: number;
  publishedAt: string;
  title: string;
  content: string;
}

interface StrapiPostAttributes {
  title?: string;
  content?: string;
  publishedAt?: string;
}

interface StrapiPostEntry {
  id: number;
  documentId?: string;
  title?: string;
  content?: string;
  publishedAt?: string;
  attributes?: StrapiPostAttributes;
}

interface StrapiCollectionResponse {
  data: StrapiPostEntry[];
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  // URL publica do Strapi Cloud.
  private baseUrl = 'https://upbeat-hero-72b95d224c.strapiapp.com/api';
  // Deixe vazio se a collection tiver permissao publica de leitura.
  private apiToken = '';

  posts = signal<BlogPost[]>([]);
  postsError = signal(false);

  constructor(private http: HttpClient) {}

  private buildUrl(params?: string): string {
    const suffix = params ? `?${params}` : '';
    return `${this.baseUrl}/articles${suffix}`;
  }

  private requestHeaders(): HttpHeaders | undefined {
    if (!this.apiToken) {
      return undefined;
    }

    return new HttpHeaders({
      Authorization: `Bearer ${this.apiToken}`,
    });
  }

  private mapPost(entry: StrapiPostEntry): BlogPost {
    const attributes = entry.attributes;

    return {
      id: entry.id,
      publishedAt: entry.publishedAt ?? attributes?.publishedAt ?? '',
      title: entry.title ?? attributes?.title ?? '',
      content: entry.content ?? attributes?.content ?? '',
    };
  }

  loadRecentPosts(limit = 3): void {
    const url = this.buildUrl(`sort=publishedAt:desc&pagination[limit]=${limit}`);
    this.http.get<StrapiCollectionResponse>(url, { headers: this.requestHeaders() }).pipe(
      map((response) => response.data.map((entry) => this.mapPost(entry))),
    ).subscribe({
      next: (data) => {
        this.posts.set(data);
        this.postsError.set(false);
      },
      error: () => {
        this.posts.set([]);
        this.postsError.set(true);
      },
    });
  }

  getPostById(id: string): Observable<BlogPost | null> {
    const encodedId = encodeURIComponent(id);
    const url = this.buildUrl(`filters[id][$eq]=${encodedId}`);

    return this.http.get<StrapiCollectionResponse>(url, { headers: this.requestHeaders() }).pipe(
      map((response) => response.data[0] ? this.mapPost(response.data[0]) : null),
    );
  }
}
