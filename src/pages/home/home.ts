import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { Movies } from "../../models/movies";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  moviesList: Movies[]
  movies: Movies[]
  moviesLists: Movies[]

  constructor(
    public navCtrl: NavController,
    private _MoviesProvider: MoviesProvider
  ) { }

  ionViewDidLoad() {
    this.loadMovies()
    console.log(this._MoviesProvider.pageNum)
  }

  loadMovies() {
    return this._MoviesProvider.loadMovieList().subscribe(movies => {
      this.movies = movies.data.movies
      this.moviesLists = this.movies
    })
  }

  loadNextPage() {
    this._MoviesProvider.pageNum += 1
    console.log(this._MoviesProvider.pageNum) 
    return this._MoviesProvider.loadMovePage().subscribe( movies => {
      this.moviesList = movies.data.movies
      this.updateList()
      console.log('movies', movies)
    }) 
  }

  updateList() {
    this.moviesLists = this.moviesLists.concat(this.moviesList)
    console.log('this.moviesLists', this.moviesLists)
  }

  doInfinite(infiniteScroll) {
    this._MoviesProvider.pageNum += 1
    console.log(this._MoviesProvider.pageNum) 
    return this._MoviesProvider.loadMovePage().subscribe( movies => {
      this.moviesList = movies.data.movies
      this.updateList()
      console.log(movies)
      infiniteScroll.complete() 
    }) 
  }

  openMove(id, title) {
    const data = {
      id: id,
      title: title
    }
    return this.navCtrl.push('MoviePage', {data: data});
  }

}
