// @flow
import React from 'react';
import { Provider } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';// eslint-disable-line
import styled from 'styled-components';
import Store from '../src/stores/store';
import { syncPosts } from '../src/actions/actions';
import Layout from '../src/components/Layout';
import PostList from '../src/components/PostList';
import type { StoreType } from '../flow-types/types';

type Props = {
  posts: Array<any>
};

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
  color: palevioletred;
  display: flex;
`;

class Index extends React.Component {
  static async getInitialProps() {
    // const isServer = !!req;
    const store = Store;
    if (store.posts.length < 1) {
      try {
        await syncPosts();
      } catch (error) {
        throw error;
      }
    }
    return { posts: store.posts };
  }
  constructor(props: Props) {
    super(props);
    this.store = Store;
    this.store.posts = props.posts;
    if (this.store.posts.length < 1) {
      try {
        syncPosts();
      } catch (error) {
        throw error;
      }
    }
  }
  store: StoreType;
  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <Title>
            Movies List
          </Title>
          <PostList />
          <style jsx global>{``}</style>
        </Layout>
      </Provider>
    );
  }
}

export default Index;
