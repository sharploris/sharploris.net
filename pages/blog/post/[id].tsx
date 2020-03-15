import { withRouter } from 'next/router';
import styles from './index.module.scss';
import Layout from '../../../components/Layout';
import { Component } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import GetAllBlogPostUidsGateway from '../../../api/gateways/GetAllBlogPostUids';
import { IBlogPost } from '../../../api/models/blog_post/index';
import GetBlogPostByUidGateway from '../../../api/gateways/GetBlogPostByUid/index';
import { RichText } from '../../../api/prismic-types';
import { Params } from 'next/dist/next-server/server/router';
import PostData from '../../../components/Blog/PostData';
import FeaturedImage from '../../../components/Blog/FeaturedImage';
import SocialShare from '../../../components/Common/SocialShare';

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
  private readonly url: string;

  constructor(props: IPostProps) {
    super(props);

    this.url = this.props.router.asPath;
  }

  public render() {
    if (!this.props.post) {
      return this.postNotFound();
    }

    const blogPostData = this.props.post.data;
    const title = RichText.asText(blogPostData.title);
    const outline = RichText.asText(blogPostData.outline);

    return (
      <Layout title={title} description={outline} thumbnailUrl={blogPostData.featured_image.url}>
        <FeaturedImage image={blogPostData.featured_image} />
        <h1 className={styles.postTitle}>{title}</h1>
        <PostData
          publishedDate={this.props.post.first_publication_date}
          author={blogPostData.post_author}
        />
        <SocialShare location={this.url} title={title}></SocialShare>
        <i>{outline}</i>
        <hr/>
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