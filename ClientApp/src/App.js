import React, { useEffect } from "react";
import { Route, Redirect, Switch } from "react-router";
import { useHistory } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./components/LandingPage/Home";
import Main from "./components/Main";
import { FetchData } from "./components/Examples/FetchData";
import { Counter } from "./components/Examples/Counter";
import Login from "./components/Login/Login";
import RegisterClient from "./components/Register/RegisterClient";
import RegisterSpecialist from "./components/Register/RegisterSpecialist";
import EditService from "./components/Specialist/EditService";
import "./custom.css";
import { isJwtTokenExist, isJwtTokenExpire } from "./utils/auth";

import { setCurrentUser } from "./redux/auth";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import ServicePage from "./components/Specialist/ServicePage";
import { ProfilePage } from "./components/Specialist/ProfilePage";
import ProfileView from "./components/ClientPages/ProfileView";
import Map from "./components/Map";
import PageNotFound from "./components/PageNotFound";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isJwtTokenExist()) {
      if (isJwtTokenExpire()) {
        alert("Your session is expired. Please sign in again.");
        dispatch(setCurrentUser({}));
        history.push("/login");
      } else {
        let token = localStorage.getItem("jwtToken");
        let decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      }
    } else {
      dispatch(setCurrentUser({}));
    }
  }, []);

  return (
    <Layout>
      <Switch>
        <PublicRoute restricted={false} component={Home} path="/" exact />
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <Route
          restricted={false}
          component={ServicePage}
          path="/specialistServicePage/:specialistId"
          exact
        />
        <PublicRoute
          restricted={true}
          component={RegisterClient}
          path="/signupClient"
          exact
        />
        <PublicRoute
          restricted={true}
          component={RegisterSpecialist}
          path="/signupSpecialist"
          exact
        />

        {/* Public for now to test, need to move to PrivateRoute later */}
        <PublicRoute
          restricted={false}
          component={ProfilePage}
          path="/specialist/myprofile"
          exact
        />
        <PublicRoute
          restricted={false}
          component={EditService}
          path="/specialist/myprofile/editservice"
          exact
        />

        <PublicRoute
          restricted={false}
          component={ProfileView}
          path="/client/myprofile"
          exact
        />

        <PublicRoute restricted={false} component={Main} path="/search" exact />

        <PublicRoute path="*" component={PageNotFound}></PublicRoute>
      </Switch>
    </Layout>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    // restricted = false meaning public route, everybody could see
    // restricted = true meaning restricted route, authenticated user could not see
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default App;
