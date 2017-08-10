// @flow
import React from 'react';
import { Provider } from 'mobx-react';
import initStore from '../src/stores/store';
import Layout from '../src/components/Layout';
import PostList from '../src/components/PostList';
import type { Store } from '../flow-types/types';

type Props = {
  store: Store
};

class Index extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = !!req;
    const store = initStore();
    await store.syncPost();
    return { store, isServer };
  }
  constructor(props: Props) {
    super(props);
    this.store = this.props.store || initStore();
  }
  store: Store;
  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <h1>Hello World</h1>
          <PostList />
          <style jsx global>{``}</style>
        </Layout>
      </Provider>
    );
  }
}

export default Index;
