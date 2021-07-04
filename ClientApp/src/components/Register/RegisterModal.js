import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import PawsitiveTheme from "../../Theme";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    padding: theme.spacing(20, 0), //this is hacky. trying to center the modal
  },
  paper: {
    width: 600,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(8, 4, 3),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRows: {
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: 'linear-gradient(45deg, #89CFF0 30%, #53a6ff 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    padding: theme.spacing(2, 5),
  },
}));

const RegisterModal = () => {
  const classes = useStyles();
  const pawTheme = PawsitiveTheme;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClientClick = () => {
    history.push("/signupClient");
  };

  const handleSpecialistClick = () => {
    history.push("/signupSpecialist");
  };
  return (
    <ThemeProvider theme={pawTheme}>
      <Link
        href="#"
        variant="body2"
        onClick={(event) => {
          handleOpen(event);
        }}
      >
        {"Don't have an account? Sign Up"}
      </Link>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper} >
            <Box mb={3} ><h4 id="transition-modal-title">
              How do you want to use Pawsitive?
            </h4></Box>
            <div className={classes.buttonRows}>
              <Button onClick={() => handleClientClick()}>
                <b>Client</b>: I want to use the service
              </Button></div>
            <Box m={2} />
            <div className={classes.buttonRows}>
              <Button onClick={() => handleSpecialistClick()}>
                <b>Specialist</b>: I want to privide the service
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default RegisterModal;
