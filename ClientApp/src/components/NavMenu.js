import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./NavMenu.css";
import { setCurrentUser } from "../redux/auth";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PetsIcon from "@material-ui/icons/Pets";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import SearchIcon from '@material-ui/icons/Search';
import { TestMenu } from "./TestMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginLeft: theme.spacing(2),
  },

  popper: {
    zIndex: 1,
  },
}));

export const NavMenu = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isSpecialist, setIsSpecialist] = useState(false);
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    console.log("user.role: " + user.role);
    setRole(user.role);
    console.log("setRole result: " + role);
    if (role === "Specialist") {
      setIsSpecialist(true);
    }
    console.log("IsSpecialist?: " + isSpecialist);
  }, [user]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const search = () => {
    history.push("/search");
    setOpen(false);
  };

  const logout = () => {
    dispatch(setCurrentUser({}));
    localStorage.removeItem("jwtToken");
    history.push("/");
    window.location.reload();
  };

  const myProfile = () => {
    console.log("setRole result: " + role);
    console.log("IsSpecialist?: " + isSpecialist);
    if (role === "Specialist") {
      history.push(`/specialist/myprofile`);
    } else {
      history.push(`/client/myprofile`);
    }
    setOpen(false);
  };

  const signin = () => {
    history.push("/login");
    setOpen(false);
  };


  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <Grid container spacing={3}>
            <Grid
              item
              xs
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <NavbarBrand tag={Link} to="/" bold id="sitetitle">
                <PetsIcon style={{ fill: "#241571" }} /> Pawsitive
              </NavbarBrand>
            </Grid>
            <Grid
              item
              xs
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <MenuItem onClick={search} id="search"><SearchIcon />Find Specialists </MenuItem>
            </Grid>
            <Grid
              item
              xs
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {!isAuthenticated ? (
                <MenuItem onClick={signin} id="navimenu">
                  <ExitToAppIcon />
                  &nbsp;Sign In
                </MenuItem>
              ) : (
                <div>
                  <Button
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    id="navimenubtn"
                  >
                    Hello, {user.email.substring(0, user.email.indexOf('@'))}!
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    className={classes.popper}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={myProfile} id="menu-profile">
                                <PersonIcon />
                                &nbsp;My Profile
                              </MenuItem>
                              <MenuItem onClick={logout} id="menu-logout">
                                <ExitToAppIcon />
                                &nbsp;Log out
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </Navbar>
    </header>
  );
};
