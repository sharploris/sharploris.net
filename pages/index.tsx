import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Sharp Loris Games">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a title="About Page">About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage;
