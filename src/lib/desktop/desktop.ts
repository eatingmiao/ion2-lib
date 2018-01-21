import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavStack } from '../core/providers/nav.service';

@Component({
  template:  `
    <nav id="left" class="main-left">
      <ion-nav [root]="leftPage" #left swipeBackEnabled="false"></ion-nav>
    </nav>
    <div id="content" class="main-content">
      <ion-nav [root]="contentPage" #content swipeBackEnabled="false"></ion-nav>
    </div>
    <nav id="right" class="main-right">
      <ion-nav [root]="rightPage" #right swipeBackEnabled="false"></ion-nav>
    </nav>
  `
})

export class Desktop {
  @ViewChild('left') left: NavController;
  @ViewChild('content') content: NavController;
  @ViewChild('right') right: NavController;

  leftPage: any;
  contentPage: any;
  rightPage: any;

  constructor(
    private navStack: NavStack,
    private navParams: NavParams) {
      this.leftPage = this.navParams.get('left');
      this.contentPage = this.navParams.get('content');
      this.rightPage = this.navParams.get('right');
  }

  ngAfterViewInit () {
    this.navStack.leftNav = this.left;
    this.navStack.contNav = this.content;
    this.navStack.rightNav = this.right;
  }
}
