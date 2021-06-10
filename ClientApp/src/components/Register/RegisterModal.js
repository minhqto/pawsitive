import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
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
    height: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(20, 4, 3),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRows: {
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
          <div className={classes.paper}>
            <h4 id="transition-modal-title" className={classes.modalTitle}>
              Sign up as a Client or Specialist?
            </h4>
            <div className={classes.buttonRows}>
              <Button
                className={classes.button}
                onClick={() => handleClientClick()}
                color="primary"
              >
                Client
              </Button>
              <Button
                className={classes.button}
                onClick={() => handleSpecialistClick()}
                color="primary"
              >
                Specialist
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default RegisterModal;
