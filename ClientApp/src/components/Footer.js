import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavMenu.css";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PetsIcon from '@material-ui/icons/Pets';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginLeft: theme.spacing(2),
    },
    box: {
        fontFamily: 'BioRhyme'
    },
    link: {
        color: 'white'
    }
}));

export const Footer = () => {

    return (
        <footer style={{ background: 'linear-gradient(to right bottom, #89CFF0, #241571)' }}>
            <Box px={{ xs: 2, sm: 10 }}
                py={{ xs: 2, sm: 5 }}
                color="white">
                <Container maxWidth="lg">
                    <Grid container spacing="5">
                        <Grid item xs={12} sm={4}>
                            <Box fontWeight="fontWeightBold" py={{ sm: 1 }} fontSize={20}><PetsIcon /> &nbsp; Pawsitive </Box>
                            <Box>
                                We are a group of animal lovers.
                                Our aim is to deliver a better future for the dogs and humans.
                            </Box>
                            <Box>
                                Email: help@pawsitive.ca
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1} fontWeight="fontWeightBold" mb={1} >Our Specialist in...</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Ontario
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" underline='none'>
                                    British Columbia
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Quebec
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/">
                                    Alberta
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1} fontWeight="fontWeightBold" mb={1}>Follow Us</Box>
                            <Box>
                                <FacebookIcon /> &nbsp;
                                <TwitterIcon /> &nbsp;
                                <InstagramIcon />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={{ xs: 5, sm: 10 }}
                        pb={{ xs: 5, sm: 0 }}>Pawsitive &reg; {new Date().getFullYear()} </Box>
                </Container>
            </Box>
        </footer>
    );
};
