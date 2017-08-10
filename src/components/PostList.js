// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
// import type { MobxStore } from '../flow-types/types'

// type Props = {
//   store: MobxStore
// }

@inject('store')
@observer
class PostList extends React.Component {
  componentDidMount() {
    if (this.props.store.posts.length === 0) {
      this.props.store.syncPost();
    }
  }
  render() {
    return (
      <div>
        {this.props.store.posts.map(post =>
          <li key={post.show.id}>
            {post.show.name}
          </li>
        )}
      </div>
    );
  }
}

export default PostList;
