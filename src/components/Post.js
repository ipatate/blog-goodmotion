// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../src/stores/store';

type Props = {
  store: StoreType
};
export class Post extends React.Component {
  static defaultProps = {
    store: Store
  };
  props: Props;
  render() {
    if (this.props.store.post) {
      return (
        <div>
          <h3>
            {this.props.store.post.name}
          </h3>
          <div>
            {this.props.store.post.summary}
          </div>
        </div>
      );
    }
    return <div/>;
  }
}

export default inject('store')(observer(Post));
