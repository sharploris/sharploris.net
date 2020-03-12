import * as React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Component } from 'react';
import { IBlogPostPreview } from '../../api/models/blog_post';
import GetBlogPostPreviewsGateway from '../../api/gateways/GetBlogPostPreviews/index';
import { RichText } from '../../api/prismic-types';
import GetAllBlogPostUidsGateway from '../../api/gateways/GetAllBlogPostUids';
import { WithRouterProps } from 'next/dist/client/with-router';
import Router, { withRouter } from 'next/router';
import { Params } from 'next/dist/next-server/server/router';
import { Pagination } from '@material-ui/lab';
import styles from './index.module.scss';
import { Hidden } from '@material-ui/core';

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


//TODO: Try making the root page of the blog be with no argument
class BlogPage extends Component<IBlogPageProps, {}> {
  public render() {
    const props = this.props;

    const pagination = this.renderPagination(props);

    return (
      <Layout title="Blog">
        <h1>Blog Posts</h1>
        {pagination}
        {props.posts.map(this.renderPostLink)}
        {pagination}
      </Layout>
    )
  }

  private renderPostLink(post: IBlogPostPreview){
    return (
      <div key={post.uid}>
        <Link href="/blog/post/[id]" as={`/blog/post/${post.uid}`}>
          <a>{RichText.asText(post.data.title)}</a>
        </Link>
      </div>
    );
  }

  //TODO: Refactor this into its own component
  private renderPagination(props: IBlogPageProps) {
    return (
      <span>
        <Hidden smDown>
          <div className={`${styles.paginationContainer} ${styles.large}`}>
            <Pagination 
              className={styles.paginationNav}
              count={props.totalPages} 
              defaultPage={props.currentPage} 
              color="primary" 
              variant="outlined"
              size="large"
              boundaryCount={2}
              siblingCount={2}
              hidePrevButton hideNextButton
              onChange={this.changePages}
            />
          </div>
        </Hidden>
        <Hidden mdUp xsDown>
          <div className={`${styles.paginationContainer} ${styles.medium}`}>
            <Pagination 
              className={styles.paginationNav}
              count={props.totalPages} 
              defaultPage={props.currentPage} 
              color="primary" 
              variant="outlined"
              boundaryCount={2}
              siblingCount={2}
              hidePrevButton hideNextButton
              onChange={this.changePages}
            />
          </div>
        </Hidden>
        <Hidden smUp>
          <div className={`${styles.paginationContainer} ${styles.small}`}>
            <Pagination 
              className={styles.paginationNav}
              count={props.totalPages} 
              defaultPage={props.currentPage} 
              color="primary" 
              variant="outlined"
              size="small"
              boundaryCount={1}
              siblingCount={2}
              hidePrevButton hideNextButton
              onChange={this.changePages}
            />
          </div>
        </Hidden>
      </span>
    );
  }

  private changePages(event: any, value: number) {
    event; //Suppress annoying error
    Router.push(`/blog/${value}`);
  }
}

export default withRouter(BlogPage);