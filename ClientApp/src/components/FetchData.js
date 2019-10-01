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
    books {
      name
    }
  }
}`;

function FetchData() {
  const [myMutation] = useMutation(mutation);
  const runningQuery = useQuery(query);
  const [isSending, setIsSending] = useState(false);
  const [newBookName, setNewBookName] = useState('Next book');
  const [authorFromMutation, setAuthorFromMutation] = useState(null);
  const sendRequest = useCallback(async (newBookName) => {
    if (isSending) return;
    setIsSending(true)// update state    
    let result = await myMutation({ variables: { name: newBookName, id: 1 } });
    setIsSending(false)// once the request is sent, update state again
    setAuthorFromMutation(result.data.addBookToAuthor);
  }, [isSending]) // update the callback if the state changes
  let author = authorFromMutation || (runningQuery.data && runningQuery.data.author);

  return !author
    ? <div>loading...</div>
    : <div>Data: {author.name}
      <ul>
        {author.books.map(book => <li>{book.name}</li>)}
      </ul>
      Book name: <input type="text" value={newBookName} onChange={e => setNewBookName(e.target.value)} />
      <input type="button" disabled={isSending} onClick={()=>sendRequest(newBookName)} value="Add Book" />
    </div>;
}

export default withAuth(FetchData);