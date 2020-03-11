import * as React from 'react'
import { Component } from 'react';
import Router from 'next/router'
import Layout from '../components/Layout';

export default class Index extends Component {
  componentDidMount() {
    Router.push('/blog');
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
