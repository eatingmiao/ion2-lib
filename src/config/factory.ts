import { AppInit } from "../app/app.service";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function translateFactory(http: HttpClient){
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function appInitFactory(appInit: AppInit) {
  return () => appInit.load();
}