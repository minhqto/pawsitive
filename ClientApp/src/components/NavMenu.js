import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./NavMenu.css";
import { setCurrentUser } from "../redux/auth";

export const NavMenu = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    dispatch(setCurrentUser({}));
    localStorage.removeItem("jwtToken");
    history.push("/");
    window.location.reload();
  };

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            pawsitive
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">
                  Home
                </NavLink>
              </NavItem>
              {!isAuthenticated ? (
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">
                    Sign In
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavbarText onClick={logout} className="log-out">
                    Log out
                  </NavbarText>
                </NavItem>
              )}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
