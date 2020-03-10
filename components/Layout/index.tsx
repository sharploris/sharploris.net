import React, { Component } from 'react';

import styles from './index.module.scss';
import Head from 'next/head'
import Header from '../Header'
import Footer from './../Footer/index';
import { ThemeProvider, createMuiTheme, Container } from '@material-ui/core';

type Props = {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: styles.primary
    },
    secondary: {
      main: styles.secondary
    }
  },
  typography: {
    fontFamily: [
      'Montserrat', 
      'sans-serif'
    ].join(',')
  }
});

export default class Layout extends Component<Props> {
  static defaultProps = {
    title: "",
    description: "",
    thumbnailUrl: ""
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      {/*Boilerplate*/}
      <Head>
        <title>{this.props.title ? `${this.props.title} | Sharp Loris Games` : "Sharp Loris Games"}</title>
        <meta property='og:title' content={this.props.title ? this.props.title : "Sharp Loris Games"}></meta>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {this.props.description && <meta name="description" content={this.props.description}></meta>}
        {this.props.thumbnailUrl && <meta key="image" property='og:image' content={this.props.thumbnailUrl} />}
      </Head>
      {/*End Boilerplate*/}
  
      {/* Actual Layout */}
      <div className={styles.appWrapper}>
        <Header/>
        <Container>
          {this.props.children}
        </Container>
        <Footer/>
      </div>
    </ThemeProvider>
    )
  }
}