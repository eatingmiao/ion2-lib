import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { STORE_LIST } from '../config/app.store';
import { CoreStore } from "../lib/core/core.store";

@Injectable()
export class AppInit {
  private asyncInitPromises: Promise<any>[] = [];

  constructor(
    private storage: Storage,
    private store: CoreStore) {
      this.init();
  }

  load(): Promise<boolean> {
    return new Promise((resolve,reject) => {
      Promise.all(this.asyncInitPromises)
        .then(() => {
          resolve(true);
        });
    });
  }

  init(): void {
    STORE_LIST.forEach(name => {
      let promise = this.storage.get(name);
      this.asyncInitPromises.push(promise);
      promise.then(data => {
        if(data) {
          this.store[name] = data;
        }
      });
    });
  }
}