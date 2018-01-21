import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { CoreStore } from "../lib/core/core.store";
import { NavStack } from "../lib/core/providers/nav.service";
import { Desktop } from "../lib/desktop/desktop";
import { LeftPage } from "../pages/left/left";
import { MiddlePage } from "../pages/middle/middle";
import { RightPage } from "../pages/right/right";

@Component({
  templateUrl: 'app.html'
})

export class App {
  @ViewChild('root') root: NavController;
  rootPage: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private store: CoreStore,
    private storage: Storage,
    private navStack: NavStack) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then((readySource) => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('Platform ready from', readySource);
    });
  }

  ngAfterViewInit() {
    this.navStack.rootNav = this.root;
    this.root.viewDidEnter.subscribe(data => {
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.root.push(Desktop, {
      left: LeftPage,
      content: MiddlePage,
      right: RightPage
    });
    this.store.onChange.subscribe(data => {
      this.storage.set(data.name, data.value);
    });
  }
}


