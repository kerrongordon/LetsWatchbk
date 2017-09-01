import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'MainPage';
  tab2Root = 'HomePage';
  tab3Root = 'AboutPage';
  tab4Root = 'ContactPage';
  tab5Root = 'PlayerPage';

  constructor() {

  }
}
