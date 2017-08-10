// @flow
import * as mobx from 'mobx';
import fetch from 'isomorphic-unfetch';
// import type {MobxStore} from '../flow-types/types';

let store = null;

class Store {
  @mobx.observable posts = [];

  @mobx.action
  async syncPost() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();
    this.posts = data;
  }
}

const initStore = () => {
  if (store === null) {
    store = new Store();
  }
  return store;
};

export default initStore;
