// @flow
import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';

type Props = {
  store: StoreType
};

export const PostList = (props: Props) => {
  if (props.store && props.store.posts) {
    return (
      <div>
        {props.store.posts.map(post =>
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

export default inject('store')(observer(PostList));
