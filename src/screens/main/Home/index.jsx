import React from 'react';

import { Body, Document, Head } from 'components/common/base/Page';
import Layout from 'components/common/composite/Layout';

function Home() {
  return (
    <Document>
      <Head>
        <title>通貨換算ツール</title>
        <meta
          content="An extremely simple React app for converting currencies"
          name="description"
        />
      </Head>
      <Body>
        <Layout>
          <h2>Home screen</h2>
        </Layout>
      </Body>
    </Document>
  );
}

export default Home;
