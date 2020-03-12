import * as React from 'react'
import { Component } from 'react';
import Layout from '../components/Layout';
import { Typography } from '@material-ui/core';



export default class NotFoundPage extends Component {
  public render() {
    return (
      <Layout>
        <Typography variant="h4" style={{minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            404 - Page Not Found
        </Typography>
      </Layout>
    );
  }
}
