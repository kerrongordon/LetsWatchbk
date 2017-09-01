import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
// import { Movies } from '../../models/movies';

@IonicPage()
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})
export class MoviePage {

  data: any;
  movie: any
  pagetitle: string
  segments: string = 'description'

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _MoviesProvider: MoviesProvider
  ) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data')
    console.log('ionViewDidLoad MoviePage', this.data);
    this.pagetitle = this.data.title
    this.getMovie()
  }

  getMovie() {
    return this._MoviesProvider.loadDetailsPage(this.data.id)
      .subscribe(movie => {
        this.movie = movie.data.movie;
        console.log(movie.data.movie)
      })
  }

}
