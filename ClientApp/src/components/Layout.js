import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ApolloClient from 'apollo-boost';
import NavMenu from './NavMenu';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route } from 'react-router';
import { Home } from './Home';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Counter } from './Counter';
import FetchData from './FetchData';

import withAuth from '@okta/okta-react/dist/withAuth';

class Layout extends Component {

  render() {

    const clientParam = { uri: '/graphql' };
    let myAuth = this.props && this.props.auth;
    console.log(this.props);
    console.log('myAuth', myAuth);
    if (myAuth) {
      clientParam.request = async (operation) => {
        let token = await myAuth.getAccessToken();
        console.log(token);
        operation.setContext({ headers: { authorization: token ? `Bearer ${token}` : '' } });
      }
    }
    const client = new ApolloClient(clientParam);

    return (
      <div>
        <NavMenu />
        <Container>
          <ApolloProvider client={client} >
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <SecureRoute path='/fetch-data' component={FetchData} />
            <Route path='/implicit/callback' component={ImplicitCallback} />
          </ApolloProvider>
        </Container>
      </div>
    );
  }
}

export default withAuth(Layout);
