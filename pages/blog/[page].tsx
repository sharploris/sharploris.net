import * as React from 'react'
import { Component } from 'react';
// import styles from './index.module.scss';
import Link from 'next/link'
import Layout from '../../components/Layout'
import { IBlogPostPreview } from '../../api/models/blog_post';
import GetBlogPostPreviewsGateway from '../../api/gateways/GetBlogPostPreviews/index';
import { RichText } from '../../api/prismic-types';
import GetAllBlogPostUidsGateway from '../../api/gateways/GetAllBlogPostUids';
import { WithRouterProps } from 'next/dist/client/with-router';
import Router, { withRouter } from 'next/router';
import { Params } from 'next/dist/next-server/server/router';
import { Badge } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PageControls from '../../components/Common/Pagination';

const pageSize = 10;

interface IBlogPageProps extends WithRouterProps {
  currentPage: number;
  totalPages: number;
  posts: IBlogPostPreview[];
}

//Add support for URL queries for page number, number of results
//Add support for get static paths for 10, 20, 50 results for each page
export async function getStaticProps(params: Params) {
  const { page } = params.params;
  const currentPage = parseInt(page);

  const gateway = new GetBlogPostPreviewsGateway();
  const posts = await gateway.Execute(currentPage, pageSize);

  return { 
    props: {
      currentPage: currentPage,
      totalPages: posts.total_pages,
      posts: posts.results
    } 
  };
}

export async function getStaticPaths() {
  const gateway = new GetAllBlogPostUidsGateway();
  const response = await gateway.Execute();

  const totalPages = Math.ceil(response.results.length/pageSize);

  console.log(`Generating ${totalPages} pages of ${pageSize} posts, comprising ${response.results.length} posts total`)

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push({ params: { page: i.toString() } });
  }

  return {
    fallback: false,
    paths: pageNumbers
  }
}

class BlogPage extends Component<IBlogPageProps, {}> {
  public render() {
    const props = this.props;

    const pagination = <PageControls onChangePage={this.changePages} currentPage={props.currentPage} totalPages={props.totalPages}/>

    return (
      <Layout title="Blog">
        <h1>Blog Posts</h1>
        {pagination}
        {props.posts.map(this.renderPostLink)}
        {pagination}
      </Layout>
    )
  }

  private renderPostLink = (post: IBlogPostPreview) => {
    const commentsBadge = this.renderCommentBadge(0);
    commentsBadge;

    return (
      <div key={post.uid}>
        <Link href="/blog/post/[id]" as={`/blog/post/${post.uid}`}>
          <a>{RichText.asText(post.data.title)}</a>
        </Link>
      </div>
    );
  }

  private renderCommentBadge(comments: number) {
    return (
      <Badge badgeContent={comments} color="primary">
        <ChatBubbleIcon color="secondary" />
      </Badge>
    )
  }


  private changePages = (event: any, value: number) => {
    event; //Suppress annoying error
    Router.push(`/blog/${value}`);
  }
}

export default withRouter(BlogPage);