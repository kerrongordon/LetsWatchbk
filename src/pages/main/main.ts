import { Movies } from './../../models/movies';
import { MoviesProvider } from './../../providers/movies/movies';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  
  movies: Movies;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _moviesProvider: MoviesProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.loadMostWatch()
  }

  loadMostWatch() {
    return this._moviesProvider.loadMovieMostWatch()
      .subscribe(movie => this.movies = movie.data.movies)
  }

}
