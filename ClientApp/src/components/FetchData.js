import React, { useState } from 'react';
import { withAuth } from '@okta/okta-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const query = gql`{
author(id:1){
    name,
    books {
      name
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

function FetchData() {
  //const [doneMutation, setDoneMutation] = useState(false);
  //const [author, setAuthor] = useState(null);
  //const [runningQuery, setRunningQuery] = useState(null);
  const runningQuery = useQuery(query);
  // if (runningQuery == null) {
  //   setRunningQuery(myQuery);
  // }
  let author = runningQuery.data;
  console.log(author);

  // if (!doneMutation) {
  //   try {
  //     setDoneMutation(true);
  //     const [myMutation, { data2 }] = useMutation(mutation);
  //     let result = await myMutation({ variables: { author: { name: 'Terje' } } });
  //     console.log('result', result, 'data2', data2);
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }

  if (runningQuery == null || runningQuery.loading) return <div>loading...</div>;
  return <div>Data: {author.name}</div>;
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