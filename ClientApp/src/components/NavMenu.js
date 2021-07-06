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
import Typography from "@material-ui/core/Typography";
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
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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

  const logout = () => {
    dispatch(setCurrentUser({}));
    localStorage.removeItem("jwtToken");
    history.push("/");
    window.location.reload();
  };

  const myProfile = () => {
    history.push("/specialist/myprofile");
  };

  const search = () => {
    history.push("/search");
  };

  const signin = () => {
    history.push("/login");
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
            ></Grid>
            <Grid
              item
              xs
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <TestMenu />
              &nbsp;&nbsp;
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
                    Hello, Bread!
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

// previous navi
//   const toggleNavbar = () => {
//     setCollapsed(!collapsed);
//   };

//   const logout = () => {
//     dispatch(setCurrentUser({}));
//     localStorage.removeItem("jwtToken");
//     history.push("/");
//     window.location.reload();
//   };

//   return (
//     <header>
//       <Navbar
//         className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
//         light
//       >
//         <Container>
//           <NavbarBrand tag={Link} to="/">
//             pawsitive
//           </NavbarBrand>
//           <NavbarToggler onClick={toggleNavbar} className="mr-2" />
//           <Collapse
//             className="d-sm-inline-flex flex-sm-row-reverse"
//             isOpen={!collapsed}
//             navbar
//           >
//             <ul className="navbar-nav flex-grow">
//               <NavItem>
//                 <NavLink tag={Link} className="text-dark" to="/">
//                   Home
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink
//                   tag={Link}
//                   className="text-dark"
//                   to="/specialistServicePage"
//                 >
//                   Specialist Service
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink
//                   tag={Link}
//                   className="text-dark"
//                   to="/specialist/myprofile"
//                 >
//                   Specialist Profile
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink
//                   tag={Link}
//                   className="text-dark"
//                   to="/specialist/myprofile/editservice"
//                 >
//                   Edit Service
//                 </NavLink>
//               </NavItem>

//               {!isAuthenticated ? (
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/login">
//                     Sign In
//                   </NavLink>
//                 </NavItem>
//               ) : (
//                 <NavItem>
//                   <NavbarText onClick={logout} className="log-out">
//                     Log out
//                   </NavbarText>
//                 </NavItem>
//               )}
//             </ul>
//           </Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };
