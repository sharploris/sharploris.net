import * as React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Component } from 'react';
import GetAllBlogPostUidsGateway from './../../api/gateways/GetAllBlogPostUids/index';
import { IBlogPostUid } from '../../api/models/blog_post';

interface IIndexProps {
  posts: IBlogPostUid[];
}

export default class Index extends Component<IIndexProps, {}> {
  public render() {
    const props = this.props;

    return (
      <Layout title="Blog">
        <h1>Blog Posts</h1>
        <ul>
          {props.posts.map(this.renderPostLink)}
        </ul>
      </Layout>
    )
  }

  public static async getInitialProps() {
    const gateway = new GetAllBlogPostUidsGateway();
    const response = await gateway.Execute();
  
    console.log(`Posts fetched. Count: ${response.results.length}`);
  
    return {
      posts: response.results
    };
  }

  private renderPostLink(post: IBlogPostUid){
    return (
      <li key={post.uid}>
        <Link href="blog/post/[id]" as={`blog/post/${post.uid}`}>
          <a>{post.uid}</a>
        </Link>
      </li>
    );
  }
}
