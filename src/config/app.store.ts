import { CoreStore } from "../lib/core/core.store";
export const STORE_LIST = [
  'server',
  'language'
];

const API = {
  token: '/core/connect/token'
};

const TIME = 10000;

export class AppStore extends CoreStore {
  api = API;
  time = TIME;
}



