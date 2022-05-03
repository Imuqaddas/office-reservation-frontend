import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat, ApolloProvider } from "@apollo/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const httpLink = new HttpLink({ uri: process.env.NODE_ENV === "development" ? "http://192.168.0.101:4000" : "https://api.iroda.xyz" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "x-auth-token": localStorage.getItem("token") || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
