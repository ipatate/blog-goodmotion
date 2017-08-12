// @flow
import React from 'react';
import Store from '../src/stores/store';
import { findPost } from '../src/actions/actions';
import Layout from '../src/components/Layout';
import Post from '../src/components/Post';

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
      try {
        await findPost(id);
      } catch (error) {
        throw error;
      }
    }
    return { post: store.post, isServer };
  }
  constructor(props: Props) {
    super(props);
    this.store = Store;
    this.store.post = props.post;
    const id = this.props.url.query.id;
    if (id && Store.post === null) {
      try {
        findPost(id);
      } catch (error) {
        throw error;
      }
    }
  }
  store: StoreType;
  render() {
    return (
      <Layout>
        <Post {...this.props} />
      </Layout>
    );
  }
}

export default Index;
