import React, { Component } from 'react';
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import { Security } from '@okta/okta-react';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

export default class App extends Component {
  render() {
    return (
      <BrowserRouter basename={baseUrl}>
        <Security issuer='https://dev-660868.okta.com/oauth2/default'
          clientId='0oa1ge0utjlVWYpSX357'
          redirectUri={window.location.origin + '/implicit/callback'}
          pkce={true}>
          <Layout>
          </Layout>
        </Security>
      </BrowserRouter>
    );
  }
}
