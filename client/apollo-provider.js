import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(VueApollo);

const httpLink = createHttpLink({ uri: `${window.BASE_URL}/graphql` });

const cache = new InMemoryCache();

const authorizationLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: { companyId: localStorage.getItem('current-company') }
  });

  return forward(operation).map((response) => {
    const companyId = operation.getContext().response.headers.get('companyid');
    if (companyId) {
      localStorage.setItem('current-company', companyId);
    } else {
      localStorage.removeItem('current-company');
    }

    return response;
  });
});

const apolloClient = new ApolloClient({
  link: concat(authorizationLink, httpLink),
  cache
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default apolloProvider;
