import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { appInitFactory, translateFactory } from "../config/factory";
import { CoreModule } from "../lib/core/core.module";

import { IonicStorageModule } from "@ionic/storage";
import { CoreStore } from "../lib/core/core.store";
import { AppStore } from "../config/app.store";

import { App } from "./app.component";
import { AppInit } from "./app.service";
import { HttpClient } from "@angular/common/http";

import { DesktopModule } from "../lib/desktop/desktop.module";
import { LeftPage } from "../pages/left/left";
import { MiddlePage } from "../pages/middle/middle";
import { RightPage } from "../pages/right/right";

@NgModule({
  declarations: [
    App,
    LeftPage,
    MiddlePage,
    RightPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateFactory),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name : '__AppStorage__',
      driverOrder : ['localstorage', 'indexeddb' , 'websql']
    }),
    CoreModule.forRoot({
      store: {
        provide: CoreStore,
        useClass: AppStore
      }
    }),
    DesktopModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    LeftPage,
    MiddlePage,
    RightPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppInit,
    { 
      provide : APP_INITIALIZER, 
      useFactory: appInitFactory,
      deps: [AppInit],
      multi: true
    }
  ]
})
export class AppModule {
  constructor() {
  }
}
