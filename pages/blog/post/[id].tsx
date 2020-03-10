import { withRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { Component } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import GetAllBlogPostUidsGateway from '../../../api/gateways/GetAllBlogPostUids';
import { IBlogPost } from '../../../api/models/blog_post/index';
import GetBlogPostByUidGateway from '../../../api/gateways/GetBlogPostByUid/index';
import { RichText } from '../../../api/prismic-types';
import { Params } from 'next/dist/next-server/server/router';

interface IPostProps extends WithRouterProps {
  post: IBlogPost
}

export async function getStaticProps(params: Params) {
  const { id } = params.params;

  const gateway = new GetBlogPostByUidGateway();
  const post = await gateway.Execute(id);

  return { 
    props: {
      post: post
    } 
  };
}

export async function getStaticPaths() {
  const gateway = new GetAllBlogPostUidsGateway();
  const response = await gateway.Execute();

  console.log(`Posts fetched. Count: ${response.results.length}`);

  const ids = response.results.map(post => {
    return { params: { id: post.uid }}
  });

  return {
    fallback: false,
    paths: ids
  }
}

class Post extends Component<IPostProps, {}> {
  public render() {
    if (!this.props.post) {
      return this.postNotFound();
    }

    const postData = this.props.post.data;
    const title = RichText.asText(postData.title);
    const outline = RichText.asText(postData.outline);

    return (
      <Layout title={title} description={outline} thumbnailUrl={postData.featured_image.url}>
        <h1>{title}</h1>
        <RichText render={postData.outline} />
      </Layout>
    );
  }

  private postNotFound() {
    return (
      <Layout title="Post Not Found">
        <h1>Post Not Found</h1>
      </Layout>
    )
  }
}

export default withRouter(Post);