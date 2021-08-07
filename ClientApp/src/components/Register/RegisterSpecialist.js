import React, { useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PawsitiveTheme from "../../Theme";
import Alert from "@material-ui/lab/Alert";
import DistanceSlider from "../DistanceSlider";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw, convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
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

const SERVICE_TYPES = [
  {
    name: "Training",
    label: "Dog Training",
  },
  {
    name: "Grooming",
    label: "Dog Grooming",
  },
  {
    name: "Pet Food",
    label: "Dog Food",
  },
  {
    name: "Therapy",
    label: "Therapy",
  },
  // {
  //   name: "daycare",
  //   label: "Daycare",
  // },
  // {
  //   name: "boarding",
  //   label: "Boarding",
  // },
];

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
  const [provideHomeVisitService, setProvideHomeVisitService] = useState(false);
  const [radius, setRadius] = useState(0);
  const [availability, setAvailability] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [streetAddressError, setStreetAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [countryError, setCountryError] = useState("");
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
    const rteContent = convertToRaw(state.getCurrentContent());
    setAboutMe(rteContent);

    // How to convert state to HTML, for future display purpose
    // let contentState = convertFromRaw(JSON.parse(jsonRte)); // convert json string to content state object
    // let html = convertToHTML(contentState); // convert content state object to html
    // console.log(html); // display the html
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
        aboutMe: JSON.stringify(aboutMe),
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
    } else {
      alert(
        "Registration incomplete! Please ensure all required fields are filled out."
      );
    }
  };
  const handleValidation = () => {
    //Email
    if (email === "") {
      setEmailError("Email must not be empty.");
      return false;
    } else {
      setEmailError("");
    }

    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      setEmailError("Email is invalid.");
      return false;
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
      setConfirmPasswordError(
        "The password and confirmation password do not match."
      );
      return false;
    } else {
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
  };

  return (
    <ThemeProvider theme={pawTheme}>
      {serverError && <Alert severity="error">{serverError}</Alert>}
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src="https://i.imgur.com/WHw5aeR.jpg"></Avatar>
          <Typography component="h1" variant="h5">
            Register as Specialist
          </Typography>
          <form
            onSubmit={handleRegisterOnClick}
            className={classes.form}
            noValidate
          >
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
                  onChange={(e) => {
                    setServerError("");
                    setBusinessName(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item md={8}>
                <FormLabel component="legend">
                  Service Types you offer (check all that apply)
                </FormLabel>

                {SERVICE_TYPES.map((s, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          if (!e.target.checked) {
                            setServiceTypes(
                              serviceTypes.filter((item) => item !== s.name)
                            );
                          } else {
                            setServiceTypes([...serviceTypes, s.name]);
                          }
                        }}
                        name={s.name}
                        color="primary"
                      />
                    }
                    label={s.label}
                  />
                ))}
              </Grid>
              <Grid item xs={4}>
                <FormLabel component="legend">Home Visit Service</FormLabel>
                <FormControlLabel
                  value="top"
                  control={
                    <Checkbox
                      onChange={() =>
                        setProvideHomeVisitService(!provideHomeVisitService)
                      }
                      color="primary"
                    />
                  }
                  id="ProvideHomeVisitService"
                  label="Provide Home Visit Service?"
                  name="ProvideHomeVisitService"
                  labelPlacement="end"
                />
                {provideHomeVisitService && (
                  <DistanceSlider
                    setValue={(value) => setRadius(value)}
                    id="radius"
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                About Me
                <TextareaAutosize
                  rowsMin={5}
                  rowsMax={6}
                  InputLabelProps={{ required: true }}
                  style={{ width: "100%" }}
                  placeholder="Tell us about your business (Certification, experience, service detail...)"
                  InputLabelProps={{ required: true }}
                  name="aboutMe"
                  onChange={(e) => setAboutMe(e.target.value)}
                />
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
                >
                  Register
                </Button>
                <Link
                  href="#"
                  variant="body2"
                  onClick={(event) => {
                    handleLogInOnClick(event);
                  }}
                >
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
