import React, { useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PawsitiveTheme from "../../Theme";
import DistanceSlider from "../DistanceSlider";
import MUIRichTextEditor from "mui-rte";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "url(https://i.imgur.com/PUSQ6f7.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterSpecialist = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [provideHomeVisitService, setProvideHomeVisitService] = useState("");
  const [radius, setRadius] = useState("");
  const [availability, setAvailability] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [serviceTypes, setServiceTypes] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [streetAddressError, setStreetAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  //const [businessNameError, setBusinessNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  //const [provideHomeVisitServiceError, setProvideHomeVisitServiceError] = useState("");
  //const [radiusError, setRadiusError] = useState("");
  //const [availabilityError, setAvailabilityError] = useState("");
  const [aboutMeError, setAboutMeError] = useState("");
  const [serviceTypesError, setServiceTypesError] = useState("");
  const [serverError, setServerError] = useState("");
  const classes = useStyles();
  const pawTheme = PawsitiveTheme;
  const history = useHistory();
  //const [isPasswordEqual, setIsPasswordEqual] = useState(true);

  Object.assign(pawTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          marginBottom: 150,
          width: "100%",
        },
        editor: {
          border: "1px solid gray",
        },
      },
    },
  });

  const handleLogInOnClick = (event) => {
    event.preventDefault();
    history.push("/login");
  };

  const getAboutMe = (state) => {
    console.log(state.getCurrentContent().getPlainText());
  };

  const handleRegisterOnClick = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const reqBody = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        streetAddress: streetAddress,
        city: city,
        province: province,
        postalCode: postalCode,
        businessName: businessName,
        phoneNumber: phoneNumber,
        provideHomeVisitService: provideHomeVisitService,
        radius: radius,
        availability: availability,
        aboutMe: aboutMe,
        serviceTypes: serviceTypes,
      };
      axios
        .post("/api/Authenticate/register-specialist", reqBody)
        .then((res) => {
          if (res.status === 200) {
            // Need to prompt pop-up "Thank you for Sign-up! Please sign-in"
            alert("Thank you for Sign-up! Please sign-in");
            history.push("/login");
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          const { message } = err.response.data;
          console.error(err);
          setServerError(message);
        });
    }
  };
  const handleValidation = () => {

    //Email
    if (email === "") {
      setEmailError("Email must not be empty.");
      return false;
    } else {
      setEmailError("");
    };

    if (typeof email !== "undefined") {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        setEmailError("Email is not valid.");
        return false;
      }
    }

    //Password
    if (password === "") {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError("");
    }

    //confirmPassword
    if (confirmPassword === "") {
      setConfirmPasswordError("Confirmation Password is required");
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("The password and confirmation password do not match.");
      return false;
    }
    else {
      setConfirmPasswordError("");
    }

    //firstName
    if (firstName === "") {
      setFirstNameError("First Name is required");
      return false;
    } else {
      setFirstNameError("");
    }

    //LastName
    if (lastName === "") {
      setLastNameError("Last Name is required");
      return false;
    } else {
      setLastNameError("");
    }

    //StreetAddress
    if (streetAddress === "") {
      setStreetAddressError("Street Address is required");
      return false;
    } else {
      setStreetAddressError("");
    }

    //City
    if (city === "") {
      setCityError("City is required");
      return false;
    } else {
      setCityError("");
    }

    //Province
    if (province === "") {
      setProvinceError("Province is required");
      return false;
    } else {
      setProvinceError("");
    }

    //PostalCode
    if (postalCode === "") {
      setPostalCodeError("Postal Code is required");
      return false;
    } else {
      setPostalCodeError("");
    }

    //PhoneNumber
    if (phoneNumber === "") {
      setPhoneNumberError("Phone Number is required");
      return false;
    } else {
      setPhoneNumberError("");
    }

    //AboutMe
    if (aboutMe === "") {
      setAboutMeError("About Me is required");
      return false;
    } else {
      setAboutMeError("");
    }

    return true;
  }


  // const validateEmail = () => {
  //   if (email === "") {
  //     setEmailError("Email must not be empty.");
  //     return false;
  //   } else {
  //     setEmailError("");
  //     return true;
  //   }
  // };

  // const validatePassword = () => {
  //   if (password === "") {
  //     setPasswordError("Password is required");
  //     return false;
  //   } else {
  //     setPasswordError("");
  //     return true;
  //   }
  // };

  // const validateConfirmPassword = () => {
  //   if (confirmPassword === "") {
  //     setConfirmPasswordError("Confirmation Password is required");
  //     return false;
  //   } else if (confirmPassword !== password) {
  //     setConfirmPasswordError("The password and confirmation password do not match.");
  //     return false;
  //   }
  //   else {
  //     setConfirmPasswordError("");
  //     return true;
  //   }
  // };


  return (
    <ThemeProvider theme={pawTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src="https://i.imgur.com/WHw5aeR.jpg"></Avatar>
          <Typography component="h1" variant="h5">
            Register as Specialist
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={3} />
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setServerError("");
                    setEmailError("");
                    setEmail(e.target.value);
                  }}
                  error={emailError !== ""}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setServerError("");
                    setPasswordError("");
                    setPassword(e.target.value);
                  }}
                  error={passwordError !== ""}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  onChange={(e) => {
                    setServerError("");
                    setConfirmPasswordError("");
                    setConfirmPassword(e.target.value);
                  }}
                  error={confirmPasswordError !== ""}
                  helperText={confirmPasswordError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e) => {
                    setServerError("");
                    setFirstNameError("");
                    setFirstName(e.target.value);
                  }}
                  error={firstNameError !== ""}
                  helperText={firstNameError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) => {
                    setServerError("");
                    setLastNameError("");
                    setLastName(e.target.value);
                  }}
                  error={lastNameError !== ""}
                  helperText={lastNameError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="streetAddress"
                  label="Street Address"
                  id="streetAddress"
                  onChange={(e) => {
                    setServerError("");
                    setStreetAddressError("");
                    setStreetAddress(e.target.value);
                  }}
                  error={streetAddressError !== ""}
                  helperText={streetAddressError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  onChange={(e) => {
                    setServerError("");
                    setCityError("");
                    setCity(e.target.value);
                  }}
                  error={cityError !== ""}
                  helperText={cityError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="province"
                  label="Province"
                  id="province"
                  onChange={(e) => {
                    setServerError("");
                    setProvinceError("");
                    setProvince(e.target.value);
                  }}
                  error={provinceError !== ""}
                  helperText={provinceError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="postalCode"
                  label="Postal Code"
                  id="postalCode"
                  onChange={(e) => {
                    setServerError("");
                    setPostalCodeError("");
                    setPostalCode(e.target.value);
                  }}
                  error={postalCodeError !== ""}
                  helperText={postalCodeError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  onChange={(e) => {
                    setServerError("");
                    setPhoneNumberError("");
                    setPhoneNumber(e.target.value);
                  }}
                  error={phoneNumberError !== ""}
                  helperText={phoneNumberError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="businessName"
                  label="Business Name"
                  id="businessName"
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item md={12}>
                <FormLabel component="legend">
                  Services you offer (check all that apply)
                </FormLabel>
                <FormControlLabel
                  control={<Checkbox name="training" color="primary" />}
                  label="Dog Training"
                />
                <FormControlLabel
                  control={<Checkbox name="grooming" color="primary" />}
                  label="Dog Grooming"
                />
                <FormControlLabel
                  control={<Checkbox name="food" color="primary" />}
                  label="Pet Food"
                />
                <FormControlLabel
                  control={<Checkbox name="therapy" color="primary" />}
                  label="Behavioural Therapy"
                />
                <FormControlLabel
                  control={<Checkbox name="daycare" color="primary" />}
                  label="Daycare"
                />
                <FormControlLabel
                  control={<Checkbox name="boarding" color="primary" />}
                  label="Boarding"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  id="ProvideHomeVisitService"
                  label="Provide Home Visit Service?"
                  name="ProvideHomeVisitService"
                  labelPlacement="end"
                />
                <DistanceSlider
                  id="radius" />
              </Grid>

              <Grid item xs={8}>
                About Me
                <MUIRichTextEditor
                  label="Tell us about yourself!"
                  onChange={getAboutMe}
                />
                {/* <TextField
                  multiline
                  rows={6}
                  variant="outlined"
                  required
                  fullWidth
                  name="about"
                  label="Tell us about yourself!"
                  id="about"
                /> */}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => {
                    handleRegisterOnClick(event);
                  }}
                >
                  Register
                </Button>
                <Link href="#"
                  variant="body2"
                  onClick={(event) => {
                    handleLogInOnClick(event);
                  }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterSpecialist;