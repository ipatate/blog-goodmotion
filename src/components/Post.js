// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../src/stores/store';
import type { StoreType } from '../../flow-types/types';

type Props = {
  store: StoreType
};

@inject('store')
@observer
class Post extends React.Component {
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
    return <div />;
  }
}

export default Post;
