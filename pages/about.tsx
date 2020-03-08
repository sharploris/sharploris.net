import React, { Component } from "react";
import Link from 'next/link'
import Layout from '../components/Layout'

export default class AboutPage extends Component {
  render() {
    return (
      <Layout title="About">
        <h1>About</h1>
        <p>This is the about page</p>
        <p>
          <Link href="/">
            <a>Go home</a>
          </Link>
        </p>
      </Layout>
    )
  }
}