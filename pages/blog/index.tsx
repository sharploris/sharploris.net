import * as React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Component } from 'react';
import { IBlogPostPreview } from '../../api/models/blog_post';
import GetBlogPostPreviewsGateway from './../../api/gateways/GetBlogPostPreviews/index';
import { RichText } from '../../api/prismic-types';

interface IIndexProps {
  posts: IBlogPostPreview[];
}

//Add support for URL queries for page number, number of results
//Add support for get static paths for 10, 20, 50 results for each page
export async function unstable_getStaticProps() {
  const gateway = new GetBlogPostPreviewsGateway();
  const posts = await gateway.Execute(1, 20);

  return { 
    props: {
      posts: posts.results
    } 
  };
}

export default class Index extends Component<IIndexProps, {}> {
  public render() {
    const props = this.props;

    return (
      <Layout title="Blog">
        <h1>Blog Posts</h1>
        {props.posts.map(this.renderPostLink)}
      </Layout>
    )
  }

  private renderPostLink(post: IBlogPostPreview){
    return (
      <div key={post.uid}>
        <Link href="blog/post/[id]" as={`blog/post/${post.uid}`}>
          <a>{RichText.asText(post.data.title)}</a>
        </Link>
      </div>
    );
  }
}
