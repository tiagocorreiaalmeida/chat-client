import { ApolloError } from 'apollo-client';

export const getApolloClientError = (error: ApolloError): string => {
  return error?.graphQLErrors[0]?.message || 'Someting went wrong please try again';
};
