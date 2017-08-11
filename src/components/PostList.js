// @flow
import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class PostList extends React.Component {
  render() {
    if (this.props.store && this.props.store.posts) {
      return (
        <div>
          {this.props.store.posts.map(post =>
            <li key={post.show.id}>
              <Link as={`/post/${post.show.id}`} href={`/post?id=${post.show.id}`}>
                <a>
                  {post.show.name}
                </a>
              </Link>
            </li>
          )}
        </div>
      );
    }
    return <div />;
  }
}

export default PostList;
