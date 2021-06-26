import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

const SearchResults = (props) => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {
      setUsers(result.data);
      props.parentCallback(result.data);
    });
  }, []);

  {
    users.forEach((user, index) => {
      items.push(<li key={index}>{user.name}</li>);
    });
  }

  return (
    <div>
      <h2>Search Results</h2>
      {items.length != 0 ? items : <div>loading...</div>}
    </div>
  );
};

export default SearchResults;
