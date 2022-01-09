import React from "react";
import Form from "../../components/Form/Form";
import List from "../../components/List/List";
import "./Home.css";
const Home = () => {
  return (
    <div className="bodyContainer">
      <Form />
      <List className="list" />
    </div>
  );
};

export default Home;
