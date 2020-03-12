import * as React from 'react'
import { Component } from 'react';
import Router from 'next/router'
import Layout from '../components/Layout';
import { homeUrl } from '../utils/global-data';

export default class Index extends Component {
  componentDidMount() {
    Router.push(homeUrl);
  }

  public render() {
    return (
      <Layout>
        <div>
          
        </div>
      </Layout>
    );
  }
}
