import { withRouter, NextRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Component } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import fetch from 'isomorphic-unfetch'

interface IPostProps extends WithRouterProps {
  show: IShow;
}

interface IShow {
  name: string;
  summary: string;
  image: IImage;
}

interface IImage {
  medium: string;
}

class Post extends Component<IPostProps, {}> {
  public render() {
    const props = this.props;

    return (
      <Layout title={props.show.name}>
        <h1>{props.show.name}</h1>
        <p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p>
        {props.show.image ? <img src={props.show.image.medium} /> : null}
      </Layout>
    );
  }

  public static async getInitialProps(context: NextRouter) {
    const { id } = context.query;

    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();

    console.log(`Fetched show: ${show.name}`);

    return { show };
  }
}

export default withRouter(Post);