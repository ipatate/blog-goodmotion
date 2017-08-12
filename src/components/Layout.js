// @flow
import React from 'react';
import type { Element } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import Store from '../stores/store';
import reset from '../styles/reset'; // eslint-disable-line
import theme from '../styles/theme';

class Layout extends React.Component {
  static defaultProps = {
    title: 'This is the default title'
  };
  constructor(props: { children: Element<any>, title?: string }) {
    super(props);
    this.store = Store;
  }
  store: StoreType;
  render() {
    const { children, title } = this.props;
    return (
      <Provider store={this.store}>
        <ThemeProvider theme={theme}>
          <div>
            <Head>
              <title>
                {title}
              </title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header>
              <nav>
                <Link href="/">
                  <a>Home</a>
                </Link>{' '}
                |
                <Link href="/about">
                  <a>About</a>
                </Link>{' '}
                |
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </nav>
            </header>
            {children}
            <footer>
              {'I`m here to stay'}
            </footer>
          </div>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default Layout;
