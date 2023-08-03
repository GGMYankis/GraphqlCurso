import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  useQuery,
} from "@apollo/client";

function App() {
  const query = gql`
    query {
      allPerson {
        name
        id
      }
    }
  `;

  const { data, loading } = useQuery(query);

  const { allPerson } = data;
  return (
    <>{loading ? <p>Cargando</p> : allPerson.map((p) => [<p>{p.name}</p>])}</>
  );
}

export default App;
