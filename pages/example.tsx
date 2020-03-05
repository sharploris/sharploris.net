import * as React from 'react'
import { NextPageContext } from 'next'

interface IExampleProps {
  userAgent?: string;
}

export default class AboutPage extends React.Component<IExampleProps> {
  static async getInitialProps({ req }: NextPageContext) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    const { userAgent } = this.props
    return <main>Your user agent: {userAgent}</main>
  }
}