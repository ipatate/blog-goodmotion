// @flow
import * as mobx from 'mobx';

class Store {
  @mobx.observable posts = [];
  @mobx.observable post = null;
  @mobx.observable page = 1;
}

const store: StoreType = new Store();
export default store;
