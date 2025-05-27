import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import PostButton from "./components/Navbar/PostButton";
import { PostModalProvider } from "./components/Reusables/PostModalProvider";

// ****** Each of these will render on each page ******
// import NavBar from './components/Navbar/Bar';
// import PostBubble from './components/Navbar/PostBubble';
// ****** Post bubble conditionally renders with a passed back link prop corresponding to the respective route ******

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <PostModalProvider>
      <NavBar />
      <PostButton />
      <Outlet />
      </PostModalProvider>
    </ApolloProvider>
  );
}

export default App;
