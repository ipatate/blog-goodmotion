// @flow
import React from 'react';
import type { Element } from 'react';
import Header from './Header';

type Props = {
  children: Element<any>
};

const Layout = (props: Props) =>
  <div>
    <Header />
    {props.children}
  </div>;

export default Layout;
