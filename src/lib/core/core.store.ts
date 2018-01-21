import { HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { deepCopy } from 'ionic-angular/util/util';

export interface ServerDefine {
  app: string;
  identity: string;
}

export interface StoreChangeEvent {
  name: string;
  value: any;
}

export class CoreStore {
  private _api: any;
  private _time: number;
  private _headers: HttpHeaders;
  private _server: ServerDefine;
  private _language: string = '';

  public onChange: EventEmitter<StoreChangeEvent> = new EventEmitter<StoreChangeEvent>();

  get api() {
    return deepCopy(this._api);
  }
  set api(api) {
    this._api = api;
  }

  get time() {
    return deepCopy(this._time);
  }
  set time(time) {
    this._time = time;
  }

  get headers() {
    return this._headers;
  }
  set headers(headers) {
    this._headers = headers;
  }

  set server(server) {
    this._server = server;
    this.onChange.emit({
      name: 'server',
      value: server
    });
  }
  get server() {
    return deepCopy(this._server);
  }

  set language(lang: string) {
    this._language = lang;
    this.onChange.emit({
      name: 'language',
      value: lang
    });
  }
  get language() {
    return deepCopy(this._language);
  }

  reset() {
    this.headers = new HttpHeaders();
  }

  new(property: string) {
    let name = `_${property}`;
    Object.defineProperty(this, property, { 
      set: (data: any) => {
        this[name] = data;
        this.onChange.emit({
          name: property,
          value: data
        });
      },
      get: () => {
        return this[name];
      },
      enumerable:true,
      configurable:true
    });
  }
}