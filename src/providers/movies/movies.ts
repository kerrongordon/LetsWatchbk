import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoviesProvider {

  url: string
  detailsUrl: string
  pageNum: number = 1

  constructor(public http: Http) {
    console.log('Hello MoviesProvider Provider');
    this.url = 'https://yts.ag/api/v2/list_movies.json'
    this.detailsUrl = 'https://yts.ag/api/v2/movie_details.json'
  }

  loadMovieList() {
    return this.http.get(this.url + '?limit=24').map(res => res.json())
  }

  loadMovePage() {
    return this.http.get(this.url + '?page=' + this.pageNum + '&limit=24').map(res => res.json())
  }

  loadDetailsPage(id) {
    return this.http.get(this.detailsUrl + '?movie_id=' + id + '&with_images=true&with_cast=true').map(res => res.json())
  }

  loadMovieMostWatch() {
    return this.http.get(this.url + '?sort_by=download_count&limit=6').map(res => res.json())
  }

}

// download_count