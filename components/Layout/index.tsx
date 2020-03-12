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
      
      {this.renderMetaData()}
  
      <div className={styles.appWrapper}>
        <Header/>
        <Container className={styles.appContainer}>
          {this.props.children}
        </Container>
        <Footer/>
      </div>
    </ThemeProvider>
    )
  }

  renderMetaData() {
    const embedTitle = this.props.title || "Sharp Loris Games";

    return (
      <Head>
        <title>{this.props.title ? `${this.props.title} | Sharp Loris Games` : "Sharp Loris Games"}</title>
        <meta property='og:title' content={embedTitle}></meta>

        {
          this.props.description && 
          <>
            <meta name="description" content={this.props.description}></meta>
            <meta property="og:description" content={this.props.description} />
          </>
        }

        {
          this.props.thumbnailUrl && 
          <>
            <meta property='og:image' content={this.props.thumbnailUrl} />
          </>
        }

        <meta name="twitter:card" content="summary_large_image"></meta>

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    )
  }
}