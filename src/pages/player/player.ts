import { Component, AfterContentInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TorrentProvider } from './../../providers/torrent/torrent';

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage implements AfterContentInit {
  test: string;
  video: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _torrentProvider: TorrentProvider
  ) {  }

  ionViewDidLoad() {
    this.test = 'https://yts.ag/torrent/download/2E00D0EB4AED4DDB2F7A9E3841C3E59F9FDA94AF'
    console.log('ionViewDidLoad PlayerPage');
    this.loadVideo()
  }

  loadVideo() {
    return this._torrentProvider.getVideo(this.test).subscribe(data => {

      console.log('data', data);
      console.log('data', this._torrentProvider.video);
      // this.video = data;

      // this.video = data.files.find(function (file) {
      //   return file.name.endsWith('.mp4')
      // })

      this.video = data;

      // this.video.appendTo.output
    })
  }

  ngAfterContentInit() {
    console.log(document.getElementById('output'))
  }

}
