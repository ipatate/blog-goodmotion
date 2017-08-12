// @flow
import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

type Props = {
  store: StoreType
};

const Button = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

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
            <Button />
          </li>
        )}
      </div>
    );
  }
  return <div />;
};

export default inject('store')(observer(PostList));
