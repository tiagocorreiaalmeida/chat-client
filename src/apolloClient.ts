import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({ uri: 'http://192.168.99.100:4000/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
