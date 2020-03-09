import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import { Component } from 'react';

interface IIndexProps {
  shows: IShow[];
}

interface IShow {
  id: number;
  name: string;
}

export default class Index extends Component<IIndexProps, {}> {
  public render() {
    const props = this.props;

    return (
      <Layout title="Home">
        <h1>Batman TV Shows</h1>
        <ul>
          {props.shows.map(this.renderPostLink)}
        </ul>
      </Layout>
    )
  }

  public static async getInitialProps() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();
  
    console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      shows: data.map((entry: {show: IShow}) => entry.show)
    };
  }

  private renderPostLink(show: IShow){
    return (
      <li key={show.id}>
        <Link href="/post/[id]" as={`/post/${show.id}`}>
          <a>{show.name}</a>
        </Link>
      </li>
    );
  }
}
