import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withAuth } from '@okta/okta-react';
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
mutation AddBookToAuthor($name: String!, $id: ID!) {
  addBookToAuthor(name: $name, id: $id) {
    id
    name
  }
}`;

function FetchData() {
  const [myMutation] = useMutation(mutation);
  const runningQuery = useQuery(query);
  const [isSending, setIsSending] = useState(false);
  const sendRequest = useCallback(async () => {
    if (isSending) return;
    setIsSending(true)// update state    
    let result = await myMutation({ variables: { name: 'boken', id: 1} });
    console.log(result);
    setIsSending(false)// once the request is sent, update state again
  }, [isSending]) // update the callback if the state changes


  //const [doneMutation, setDoneMutation] = useState(false);
  //const [author, setAuthor] = useState(null);
  //const [runningQuery, setRunningQuery] = useState(null);
  // if (runningQuery == null) {
  //   setRunningQuery(myQuery);
  // }
  let author = runningQuery.data && runningQuery.data.author;
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

  return !author
    ? <div>loading...</div>
    : <div>Data: {author.name}
      <ul>
        {author.books.map(book => <li>{book.name}</li>)}
      </ul>
      <input type="button" disabled={isSending} onClick={sendRequest} value="Add Book" />
    </div>;
}

export default withAuth(FetchData);