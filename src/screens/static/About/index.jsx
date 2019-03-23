import React from 'react';

import { Body, Document, Head } from 'components/common/base/Page';
import Card from 'components/common/base/Card';
import Hyperlink from 'components/common/base/Hyperlink';
import Layout from 'components/common/composite/Layout';

function About() {
  return (
    <Document>
      <Head>
        <title>About · 通貨換算ツール</title>
        <meta content="About Tsūka" name="description" />
      </Head>
      <Body>
        <Layout adaptive>
          <Card>
            <Card.Header>What is Tsūka</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Tsūka</strong> is an extremely simple React app for
                converting currencies. It was built from scratch using only{' '}
                <Hyperlink href="https://reactjs.org">React</Hyperlink> and{' '}
                <Hyperlink href="https://reactjs.org/docs/typechecking-with-proptypes.html">
                  PropTypes
                </Hyperlink>
                . No complex state management, static type checking, and UI
                library needed!
              </Card.Text>
              <Card.Text>
                <strong>Tsūka</strong> allows you to convert currencies with
                ease. It uses data from Fixer, the touchstone foreign exchange
                (Forex) rates compiled from leading market data contributors.
              </Card.Text>
              <Card.Text>
                <strong>Tsūka</strong> is an open-source project built and
                maintained by{' '}
                <Hyperlink href="https://www.linkedin.com/in/pongsupawat">
                  Theerawat Pongsupawat
                </Hyperlink>
                , frontend developer from Chiang Mai, Thailand.
              </Card.Text>
              <hr />
              <Card.Text>
                <strong>Tsūka</strong> or 通貨 literally means “Currency” in
                Japanese.
              </Card.Text>
              <Card.Text>
                <strong>Tsūka Kansan Tsūru</strong> or 通貨換算ツール means
                “Currency Convertion Tool” or “Currency Converter”.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Tsūka API</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Tsūka API</strong> is an extremely simple REST API for
                Tsūka. It was built from scratch using Node, Express, and
                TypeScript.
              </Card.Text>
              <Card.Text>
                For more information, see this{' '}
                <Hyperlink href="https://github.com/rxseven/tsuuka-api">
                  GitHub repository
                </Hyperlink>
                .
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Licenses</Card.Header>
            <Card.Body>
              <Card.Text>
                The content of this project itself is licensed under the{' '}
                <Hyperlink href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
                  Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
                  International license
                </Hyperlink>
                , and the underlying source code is licensed under the{' '}
                <Hyperlink href="https://www.gnu.org/licenses/agpl-3.0">
                  GNU AGPLv3 license
                </Hyperlink>
                .
              </Card.Text>
            </Card.Body>
          </Card>
        </Layout>
      </Body>
    </Document>
  );
}

export default About;
