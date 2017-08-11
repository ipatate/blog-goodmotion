// @flow
import * as mobx from 'mobx';
import type { StoreType } from '../../flow-types/types';

class Store {
  @mobx.observable posts = [];
  @mobx.observable post = null;
  @mobx.observable page = 1;
}

const store: StoreType = new Store();
export default store;
