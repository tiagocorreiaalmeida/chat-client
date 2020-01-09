import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import apolloClient from './apolloClient';

import Register from './features/user/pages/Register';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Register />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
