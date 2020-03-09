import { withRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { Component } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import GetAllBlogPostUidsGateway from '../../../api/gateways/GetAllBlogPostUids';
import { IBlogPost } from '../../../api/models/blog_post/index';
import GetBlogPostByUidGateway from '../../../api/gateways/GetBlogPostByUid/index';
import { RichText } from '../../../api/prismic-types';

interface IPostProps extends WithRouterProps {
  post: IBlogPost
}

interface IParams {
  params: {
    id: string
  }
}

export async function unstable_getStaticProps(params: IParams) {
  const { id } = params.params;

  const gateway = new GetBlogPostByUidGateway();
  const post = await gateway.Execute(id);

  return { 
    props: {
      post: post
    } 
  };
}

export async function unstable_getStaticPaths() {
  const gateway = new GetAllBlogPostUidsGateway();
  const response = await gateway.Execute();

  console.log(`Posts fetched. Count: ${response.results.length}`);

  const ids = response.results.map(post => {
    return { params: { id: post.uid }}
  });

  return {
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

    return (
      <Layout title={title}>
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