// @flow
import React from 'react';
import { Provider } from 'mobx-react';
import Store from '../src/stores/store';
import { findPost } from '../src/actions/actions';
import Layout from '../src/components/Layout';
import Post from '../src/components/Post';
import type { StoreType } from '../flow-types/types';

type Props = {
  post: Object,
  url: Object
};

class Index extends React.Component {
  static async getInitialProps({ req, query }) {
    const isServer = !!req;
    const store = Store;
    const id = query.id;
    if (id) {
      await findPost(id);
    }
    return { post: store.post, isServer };
  }
  constructor(props: Props) {
    super(props);
    this.store = Store;
    this.store.post = props.post;
    const id = this.props.url.query.id;
    if (id && Store.post === null) {
      findPost(id);
    }
  }
  store: StoreType;
  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <Post {...this.props} />
        </Layout>
      </Provider>
    );
  }
}

export default Index;
