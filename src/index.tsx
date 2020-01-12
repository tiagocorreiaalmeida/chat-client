import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import apolloClient from './apolloClient';
import Router from './router';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
