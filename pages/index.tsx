import * as React from 'react'
import { Component } from 'react';
import Router from 'next/router'

export default class Index extends Component {
  componentDidMount() {
    Router.push('/blog');
  }

  public render() {
    return <></>
  }
}
