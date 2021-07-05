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
import Grid from '@material-ui/core/Grid';
import PetsIcon from '@material-ui/icons/Pets';
import Paper from "@material-ui/core/Paper";
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export const TestMenu = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const history = useHistory();

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
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
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
    const specialist = () => {
        history.push("/specialistServicePage");
    };
    const myProfile = () => {
        history.push("/specialist/myprofile");
    };

    const editService = () => {
        history.push("/specialist/myprofile/editservice");
    };

    const search = () => {
        history.push("/search");
    };

    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                Easy Access
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={specialist}>A Specialist</MenuItem>
                                    <MenuItem onClick={myProfile}>My Profile</MenuItem>
                                    <MenuItem onClick={editService}>Edit Service</MenuItem>
                                    <MenuItem onClick={search}>Search</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};