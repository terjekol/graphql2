import React, { Component, useState } from 'react';
import { withAuth } from '@okta/okta-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const query = gql`{
  author(id: 1) {
    name,
    books {
      id, name
    }
  }
}`;

const mutation = gql` 
mutation CreateAuthor($author: authorInput!) {
  createAuthor(author: $author) {
    id
    name
  }
}`;

function FetchData(props) {
  const [doneMutation, setDoneMutation] = useState(0);

  // const { loading, error, data } = useQuery(query);
  // console.log(loading, error, data);

  if (!doneMutation) {
    const [myMutation, { data2 }] = useMutation(mutation);
    myMutation({variables: {author: {name: 'Terje'}}})
      .then(result => console.log('result', result, 'data2', data2))
      .catch(error => console.error('error', error));
    setDoneMutation(true);
  }

  return <div>FetchData</div>;
}
/*
class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };

    this.props.auth.getAccessToken()
      .then(accessToken => fetch('api/SampleData/WeatherForecasts', { headers: { Authorization: 'Bearer ' + accessToken } }))
      .then(response => response.json())
      .then(data => { this.setState({ forecasts: data, loading: false }); });
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.dateFormatted}>
              <td>{forecast.dateFormatted}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    const { loading, error, data } = useQuery(query);
    console.log(loading, error, data);

    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
*/

export default withAuth(FetchData);