import * as React from 'react'
import Head from 'next/head'
import Header from '../Header'
import styles from './index.module.scss';
import globalStyles from '../../global.styles';
import Footer from './../Footer/index';

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div>
    {/*Boilerplate*/}
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <style jsx global>
        {globalStyles}
    </style>
    {/*End Boilerplate*/}

    {/* Actual Layout */}
    <div className={styles.appWrapper}>
      <Header/>
      <div className={styles.appBody}>
        {children}
      </div>
      <Footer/>
    </div>
  </div>
)

export default Layout