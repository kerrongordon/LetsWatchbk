import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import * as WebTorrent from 'webtorrent';
import * as _ from 'lodash';


function _window() : any {
  return window;
}

function _document() : any {
  return document;
}

@Injectable()
export class TorrentProvider {

  video: any;
  torrent: any

  constructor() {
    console.log('Hello TorrentProvider Provider');
  }

  checkCompatibility(): Observable<boolean> {
  _window().RTCPeerConnection = _window().RTCPeerConnection || _window().webkitRTCPeerConnection || _window().mozRTCPeerConnection;
    return Observable.of(!!_window().RTCPeerConnection);
  }

  getVideo(url: string): Observable<void> {
    return Observable.create(observer => {
      const client = new WebTorrent();

      client.add(url, torrent => {
        this.torrent = torrent;

        // console.log(torrent);

        this.video = torrent.files.find(function (file) {
          return file.name.endsWith('.mp4')
        })

        // file.appendTo('#output')

        console.log('file', this.video);

        // torrent.files[0].renderTo(this.video);
        observer.next();
      });
    });
  }

  jumpTo(progress): Observable<number> {
    this.video.currentTime = progress / 1000 * this.video.duration;
    return Observable.of(progress);
  }

  updateInfo(): Observable<any> {
    if (!this.torrent) return Observable.of({ downloadSpeed: 0, uploadSpeed: 0 });

    const downloadSpeed = !this.torrent.downloadSpeed ? 0 : this.torrent.downloadSpeed;
    const uploadSpeed = !this.torrent.uploadSpeed ? 0 : this.torrent.uploadSpeed;

    return Observable.of({ downloadSpeed, uploadSpeed });
  }

  updateProgress(): Observable<number> {
    if (!this.video) return Observable.of(0);

    const progress = this.video.currentTime / this.video.duration * 1000;

    if (_.isNaN(progress)) return Observable.of(0);

    return Observable.of(progress);
  }

  pause(pause: boolean): void {
    if (pause) this.video.pause();
    else this.video.play();
  }

  drift(seconds: number): void {
    this.video.currentTime += seconds;
  }

  toggleFullScreen(): void {
    if (!_document().fullscreen && !_document().webkitIsFullScreen && !_document().mozFullScreen) {
      if (this.video.requestFullscreen) this.video.requestFullscreen();
      else if (this.video.webkitRequestFullscreen) this.video.webkitRequestFullscreen();
      else if (this.video.mozRequestFullScreen) this.video.mozRequestFullScreen();
    } else {
      if (_document().exitFullscreen) _document().exitFullscreen();
      else if(_document().webkitExitFullscreen) _document().webkitExitFullscreen();
      else if(_document().mozCancelFullScreen) _document().mozCancelFullScreen();
    }
  }

}

