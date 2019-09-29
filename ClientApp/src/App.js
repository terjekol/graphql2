import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import FetchData from './components/FetchData';
import { Counter } from './components/Counter';
import { BrowserRouter } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
//import { gql } from 'apollo-boost';

const client = new ApolloClient({ uri: '/graphql' });
// client
//   .query({
//     query: gql`{
//       author(id: 1) {
//         name,
//         books {
//           id, name
//         }
//       }
//     }`
//   })
//   .then(result => console.log(result));

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

export default class App extends Component {

  render() {
    return (
      <BrowserRouter basename={baseUrl}>
        <Security issuer='https://dev-660868.okta.com/oauth2/default'
          clientId='0oa1ge0utjlVWYpSX357'
          redirectUri={window.location.origin + '/implicit/callback'}
          pkce={true} >
          <ApolloProvider client={client}>
            <Layout>
              <Route exact path='/' component={Home} />
              <Route path='/counter' component={Counter} />
              <SecureRoute path='/fetch-data' component={FetchData} />
              <Route path='/implicit/callback' component={ImplicitCallback} />
            </Layout>
          </ApolloProvider>
        </Security>
      </BrowserRouter>
    );
  }
}
