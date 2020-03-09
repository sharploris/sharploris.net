import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Component } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import fetch from 'isomorphic-unfetch'

interface IPostProps extends WithRouterProps, IShow {
}

interface IShow {
  id: number;
  name: string;
  summary: string;
  image: IImage;
}

interface IImage {
  medium: string;
}

interface IParams {
  params: {
    id: string
  }
}

export async function unstable_getStaticProps(params: IParams) {
  const { id } = params.params;

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { props: show };
}

export async function unstable_getStaticPaths() {
  console.log("GET PATHS");
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();
  const shows: IShow[] = data.map((entry: any) => entry.show);

  const ids = shows.map(show => {
    return { params: { id: show.id.toString() } }
  });

  return {
    paths: ids
  }
}

class Post extends Component<IPostProps, {}> {
  public render() {
    const summary: string = this.props.summary && this.props.summary.replace(/<[/]?[pb]>/g, '');

    return (
      <Layout title={this.props.name}>
        <h1>{this.props.name}</h1>
        <p>{summary}</p>
        {this.props.image ? <img src={this.props.image.medium} /> : null}
      </Layout>
    );
  }
}

export default withRouter(Post);