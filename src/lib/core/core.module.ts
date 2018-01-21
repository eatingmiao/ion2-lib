import { NgModule, Optional, SkipSelf, Provider, ClassProvider, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './providers/http.interceptor.service';

import { NavStack } from './providers/nav.service';
import { LangService } from './providers/translate.service';
import { DeviceService } from './providers/device.service';
import { MenuModule } from './directives/menu/menu.module';
export { NavStack } from './providers/nav.service';
export { LangService } from './providers/translate.service';
export { DeviceService } from './providers/device.service';
export { MenuModule } from './directives/menu/menu.module';

import { CoreStore } from './core.store';
export * from './core.store';

export interface CoreModuleConfig {
  store?: ClassProvider;
  interceptor?: Provider;
  navStack?: Provider;
}

@NgModule({
  providers: [
    NavStack,
    LangService,
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    CoreStore,
    DeviceService
  ],
  imports: [
    IonicModule,
    HttpClientModule,
    TranslateModule.forChild()
  ],
  exports: [
    IonicModule,
    HttpClientModule,
    TranslateModule,
    MenuModule
  ]
})
export class CoreModule {
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: CoreModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        config.store || CoreStore,
        config.interceptor || HttpInterceptorService,
        config.navStack || NavStack,
        LangService,
        DeviceService
      ]
    };
  }
}