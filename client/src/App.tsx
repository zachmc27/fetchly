import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import NavBar from "./components/Navbar/NavBar";
import { PostModalProvider } from "./components/Reusables/PostModalProvider";


// Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'apollo-require-preflight': 'true', 
    },
  };
});

const uploadLink = createUploadLink({
  uri: '/graphql', // your GraphQL server URI
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <PostModalProvider>
        <NavBar />
        <Outlet />
      </PostModalProvider>
    </ApolloProvider>
  );
}

export default App;
