import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/Examples/FetchData";
import { Counter } from "./components/Examples/Counter";
import Login from "./components/Login/Login";
import RegisterClient from "./components/RegisterClient";
import RegisterSpecialist from "./components/RegisterSpecialist";
import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />

        <Route path="/login" component={Login} />
        <Route path="/signupClient" component={RegisterClient} />
        <Route path="/signupSpecialist" component={RegisterSpecialist} />

        {/* Example routes, won't be used in the main app */}
        <Route path="/counter" component={Counter} />
        <Route path="/fetch-data" component={FetchData} />
      </Layout>
    );
  }
}
