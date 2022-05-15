import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import * as Yup from "yup";
import {
  MyTextInput,
  MySelect,
  MyFile,
  MyMultipleSelect,
} from "../helpers/Input";
import LoadingSpinner from "../shared/LoadingSpinner";
import MyButton from "../shared/Button";
import { Alert } from "react-bootstrap";
import { useUserContext } from "../user.context";
import { Country, State, City } from "country-state-city";
import MyMap from "../billboards/components/MyMap";
import MyCard from "../billboards/components/MyBillboard";

import "./Forms.css";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  return (
    <>
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {loading && <LoadingSpinner asOverlay />}
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "", // added for our select
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          password: Yup.string()
            .min(8, "Must be 8 characters or more")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          axios
            .post("http://localhost:8000/user/register", values, config)
            .then((response) => {
              navigate("/billboards");
            })
            .catch((error) => {
              setError(error.response.data.message);
            });

          setTimeout(() => {
            setSubmitting(false);
            setLoading(false);
          }, 400);
        }}
      >
        <Form>
          <Container className="justify-content-center">
            <MyTextInput
              label="Username"
              name="username"
              type="text"
              placeholder="Jane"
            />

            <MyTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Must be at least 8 characters"
            />

            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />
            <Row>
              <Col className="offset-3 justify-content-center mt-4 px-3" xs={6}>
                <MyButton type="submit" className="submit ms-auto me-auto wide">
                  Sign up
                </MyButton>
              </Col>
            </Row>
          </Container>
        </Form>
      </Formik>
    </>
  );
};

const LoginForm = (props) => {
  const userContext = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  return (
    <>
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {success && <Alert variant={"success"}>{success}</Alert>}
      {loading && <LoadingSpinner asOverlay />}
      <Formik
        initialValues={{
          username: "",
          password: "", // added for our select
        }}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          axios
            .post("http://localhost:8000/user/login", values, config)
            .then((response) => {
              setSuccess(response.data);
              setError(null);
              userContext.login();
              navigate("/billboards");
            })
            .catch((error) => {
              setError(error.response.data.message);
            });
          setTimeout(() => {
            setSubmitting(false);
            setLoading(false);
          }, 400);
        }}
      >
        <Form>
          <Container className="justify-content-center text-center">
            <MyTextInput label="Username" name="username" type="text" />

            <MyTextInput label="Password" name="password" type="password" />
            <Row>
              <Col className="offset-3 justify-content-center mt-4 px-3" xs={6}>
                <MyButton type="submit" className="submit ms-auto me-auto wide">
                  Log in
                </MyButton>
              </Col>
            </Row>
          </Container>
        </Form>
      </Formik>
    </>
  );
};

const MapForm = (props) => {
  const myCountries = props.Countries || [];
  const myStates = props.States || null;
  const myCities = props.Cities || null;

  return (
    <>
      <Formik
        initialValues={{
          // added for our checkbox
          Country: "NA",
          State: "NA",
          Cities: "NA", // added for our select
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        <Form onChange={(e) => props.handleChange(e)}>
          <MySelect label="Country" name="Country">
            <option value="NA" disabled>
              Select Country
            </option>
            {myCountries.map((elem, index) => {
              return (
                <option key={`country-${index}`} value={elem.code}>
                  {elem.name}
                </option>
              );
            })}
          </MySelect>
          {myStates && (
            <MySelect label="State" name="State">
              <option value="NA" disabled>
                Select state
              </option>
              {myStates.map((elem, index) => {
                return (
                  <option key={`state-${index}`} value={elem.code}>
                    {elem.name}
                  </option>
                );
              })}
            </MySelect>
          )}
          {myCities && (
            <MySelect label="City" name="Cities">
              <option value="NA" disabled>
                Select City
              </option>
              {myCities.map((elem, index) => {
                return (
                  <option key={`cities-${index}`} value={JSON.stringify(elem)}>
                    {elem.name}
                  </option>
                );
              })}
            </MySelect>
          )}
        </Form>
      </Formik>
    </>
  );
};

const ImageForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const userContext = useUserContext();

  return (
    <>
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {success && <Alert variant={"success"}>{success}</Alert>}
      {loading && <LoadingSpinner asOverlay />}
      <Formik
        initialValues={{ file: null }}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          const formData = new FormData();
          formData.append("file", values.file);
          if (props.type === "campaign") {
            if (responseResult) {
              setTimeout(() => {
                setLoading(false);
                userContext.addImage(values.file, props.type);
              }, 500);
            }
            axios
              .post("http://localhost:8000/display/image", formData, {
                withCredentials: true,
              })
              .then((response) => {
                console.log(response.data);
                setResponseResult(response.data);
                setLoading(false);
              })
              .catch((error) => {
                setError("an error has occured please try again later");
                setLoading(false);
                console.log(error);
              });
            return;
          }

          setTimeout(() => {
            setLoading(false);
            userContext.addImage(values.file, props.type);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          file: Yup.mixed().required(),
        })}
      >
        {(formik) => {
          return (
            <Container className="justify-content-center text-center">
              <form onSubmit={formik.handleSubmit}>
                <Row className="justify-content-center ml-auto mr-auto">
                  <label
                    htmlFor="file"
                    className="form-text mb-1 mt-3 justify-content-center text-center"
                  >
                    Upload an Image of the {props.type}
                  </label>
                  <br />
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                    className="text-input"
                  />
                  {formik.touched.file && formik.errors.file ? (
                    <div className="error form-text mt-1 justify-content-center text-center mb-n1">
                      {formik.errors.file}
                    </div>
                  ) : null}
                </Row>
                <Row className="mt-2">
                  <Col
                    xs={10}
                    className="offset-1 justify-content-center text-center"
                  >
                    {responseResult && (
                      <>
                        <h1 className="display-4 fs-5">Your Results</h1>
                        <Alert
                          variant={"primary"}
                        >{`The total text area in your image is ${(
                          responseResult.area * 100
                        ).toFixed(2)}% with a confidence of ${
                          responseResult.confidence
                        }%`}</Alert>
                      </>
                    )}
                  </Col>
                </Row>
                {props.type === "campaign" && (
                  <Row className="mt-2">
                    <Col
                      xs={10}
                      className="offset-1 justify-content-center text-center"
                    >
                      <h1 className="display-4 fs-6">
                        It is recommended to have from 6 words to 8 words in
                        your AD. <br />
                        Text is recommended to cover between 20% and 25% of your
                        whole image
                      </h1>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col
                    className="offset-3 justify-content-center mt-4 px-3"
                    xs={6}
                  >
                    <MyButton
                      type="submit"
                      className="submit ms-auto me-auto wide"
                    >
                      Next
                    </MyButton>
                  </Col>
                </Row>
              </form>
            </Container>
          );
        }}
      </Formik>
    </>
  );
};

const BillboardForm = (props) => {
  const navigate = useNavigate();
  const userContext = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let [mapConfig, setMapConfig] = useState({
    latitude: 31.0444,
    longitude: 31.2357,
    zoom: 2.5,
  });
  const [coordinate, setCoordinate] = useState(null);
  const [myCountries, setAllCountries] = useState([]);
  const [myStates, setAllStates] = useState(null);
  const [myCities, setAllCities] = useState(null);

  useEffect(() => {
    let countriesList = Country.getAllCountries();
    let myCountriesList = countriesList.map((country) => {
      return { name: country.name, code: country.isoCode };
    });

    setAllCountries(myCountriesList);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const changeCoordinatesHandler = (mapboxEvent) => {
    console.log(mapboxEvent);
    console.log(mapboxEvent.lngLat);
    setCoordinate({
      longitude: mapboxEvent.lngLat.lng,
      latitude: mapboxEvent.lngLat.lat,
    });
  };
  const handleMapFormChange = (e) => {
    setLoading(true);
    if (e.target.name === "country") {
      let myCountry = Country.getCountryByCode(e.target.value);
      let statesList = State.getStatesOfCountry(e.target.value);
      let myStatesList = statesList.map((state) => {
        return {
          name: state.name,
          code: `${state.countryCode} ${state.isoCode}`,
        };
      });
      setAllStates(myStatesList);
      setAllCities(null);
    }

    if (e.target.name === "state") {
      let myString = e.target.value.split(" ");
      let citiesList = City.getCitiesOfState(myString[0], myString[1]);
      setAllCities(citiesList);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {success && <Alert variant={"success"}>{success}</Alert>}
      {loading && <LoadingSpinner asOverlay />}
      <Formik
        initialValues={{
          aspectRatio: "4:3",
          street: "",
          city: "NA",
          state: "NA",
          country: "",
          rate: "", // added for our select
        }}
        validationSchema={Yup.object({
          aspectRatio: Yup.string()
            .oneOf(["4:3", "16:9", "21:9", "1:1", "9:16", "9:21"])
            .required("Required"),
          street: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          state: Yup.string().required("Required"),
          country: Yup.string().required("Required"),
          rate: Yup.number().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (!coordinate) {
            setError(
              "No point supplied for the billboard, please choose on map"
            );
            return;
          }
          setSubmitting(true);
          setLoading(true);
          const formData = new FormData();
          formData.append("file", userContext.billboardImage);
          formData.append("aspectRatio", values.aspectRatio);
          formData.append("street", values.street);
          formData.append("city", values.city);
          formData.append("state", values.state);
          formData.append("country", values.country);
          formData.append("rate", values.rate);
          formData.append("latitude", coordinate.latitude);
          formData.append("longitude", coordinate.longitude);

          console.log();
          console.log(values);
          axios
            .post("http://localhost:8000/billboard", formData, config)
            .then((response) => {
              console.log(response);
              setError(null);
              setSubmitting(false);
              setLoading(false);
              setSuccess(response.data.message);
            })
            .catch((error) => {
              setSuccess(null);
              setSubmitting(false);
              setLoading(false);
              setError(
                "an Error occured, please try again later, if it persists contact support"
              );
            });
        }}
      >
        <Form>
          <Container className="justify-content-center">
            <Row>
              <Col>
                <Form>
                  <MyTextInput
                    label="Street name"
                    name="street"
                    type="text"
                    placeholder="Nasr road"
                  />

                  <MySelect label="Closest aspect ratio" name="aspectRatio">
                    {["4:3", "16:9", "21:9", "1:1", "9:16", "9:21"].map(
                      (elem, index) => {
                        return (
                          <option value={elem} key={`aspectRatio-${index}`}>
                            {elem}
                          </option>
                        );
                      }
                    )}
                  </MySelect>
                  <MyTextInput
                    label="Rate (per hour), prices in USD"
                    name="rate"
                    type="number"
                    placeholder="100"
                  />
                </Form>
              </Col>
              <Col sm={5} className="offset-1">
                <Form onChange={(e) => handleMapFormChange(e)}>
                  <MySelect label="Country" name="country">
                    <option value="NA" disabled>
                      Select Country
                    </option>
                    {myCountries.map((elem, index) => {
                      return (
                        <option key={`country-${index}`} value={elem.code}>
                          {elem.name}
                        </option>
                      );
                    })}
                  </MySelect>
                  {myStates && (
                    <MySelect label="State" name="state">
                      <option value="NA" disabled>
                        Select state
                      </option>
                      {myStates.map((elem, index) => {
                        return (
                          <option key={`state-${index}`} value={elem.code}>
                            {elem.name}
                          </option>
                        );
                      })}
                    </MySelect>
                  )}
                  {myCities && (
                    <MySelect label="City" name="city">
                      <option value="NA" disabled>
                        Select City
                      </option>
                      {myCities.map((elem, index) => {
                        return (
                          <option key={`cities-${index}`} value={elem.name}>
                            {elem.name}
                          </option>
                        );
                      })}
                    </MySelect>
                  )}
                </Form>
              </Col>
            </Row>
            <Row>
              <h1 className="form-text mt-4 justify-content-center text-center display-4 fs-4">
                Choose the location of the billboard on the map, try to be
                accurate as possible.
              </h1>
              <small className="text-muted">
                Locations that does not match address entered will have their
                requests refused
              </small>
              <MyMap
                mapConfig={mapConfig}
                setMapConfig={setMapConfig}
                location="modal"
                clickHandler={changeCoordinatesHandler}
                selectedLocation={coordinate}
              />
            </Row>
            <Row>
              <Col className="offset-3 justify-content-center mt-4 px-3" xs={6}>
                <MyButton type="submit" className="submit ms-auto me-auto wide">
                  Send Request
                </MyButton>
                <MyButton
                  clickHandler={() => {
                    userContext.addImage(null, "billboard");
                  }}
                  className="submit ms-auto me-auto wide change mt-2"
                >
                  Change image
                </MyButton>
              </Col>
            </Row>
          </Container>
        </Form>
      </Formik>
    </>
  );
};

const CampaignForm = () => {
  const userContext = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  function formatted_date(date) {
    let result = "";
    var d = new Date();
    result += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return result;
  }

  return (
    <>
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {success && <Alert variant={"success"}>{success}</Alert>}
      {loading && <LoadingSpinner asOverlay />}
      <Formik
        initialValues={{
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          frequency: "",
          duration: "",
        }}
        validationSchema={Yup.object({
          startDate: Yup.date()
            .min(formatted_date(), "Must be after today's date")
            .required("Required"),
          endDate: Yup.date()
            .required("Required")
            .when(
              "startDate",
              (startDate, schema) =>
                startDate &&
                schema.min(startDate, "Must be after selected start date")
            ),
          startTime: Yup.number()
            .required("Required")
            .min(0, "Must be greater than zero")
            .max(23, "Must be less than 23"),
          endTime: Yup.number()
            .required("Required")
            .when(
              "startTime",
              (startTime, schema) =>
                startTime &&
                schema.min(startTime, "Must be after the desired start time")
            )
            .max(24, "Must be less than 24"),
          duration: Yup.number()
            .required("Required")
            .min(1, "Must be greater than zero"),
          frequency: Yup.number()
            .required("Required")
            .min(1, "Must be greater than zero"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setLoading(true);
          userContext.addCampaign(values);
          setTimeout(() => setLoading(false), 500);

          console.log(values);
        }}
      >
        <Form>
          <Container className="justify-content-center">
            <h1 className="display-4 text-center fs-3">
              Date, Time & Duration
            </h1>
            <Row className="justify-content-center">
              <Col sm={5} xs={10} className="mx-3">
                <MyTextInput
                  label="Starting date"
                  name="startDate"
                  type="date"
                  placeholder="Starting date 31/12/2021"
                />
              </Col>
              <Col sm={5} xs={10} className="mx-3">
                <MyTextInput
                  label="Ending date"
                  name="endDate"
                  type="date"
                  placeholder="Ending date 31/12/2021"
                />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm={5} xs={10} className="mx-3">
                <MyTextInput
                  label="Starting Time"
                  name="startTime"
                  type="number"
                  placeholder="place time in 24hr fromat"
                />
              </Col>
              <Col sm={5} xs={10} className="mx-3">
                <MyTextInput
                  label="Ending Time"
                  name="endTime"
                  type="number"
                  placeholder="place time in 24hr fromat"
                />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm={5} xs={10} className="mx-3">
                <MyTextInput
                  label="Duration in seconds"
                  name="duration"
                  type="number"
                  placeholder="duration of ad on screen"
                />
              </Col>
              <Col sm={5} xs={10} className="mx-3">
                <MyTextInput
                  label="Frequency"
                  name="frequency"
                  type="number"
                  placeholder="times your ad is shown"
                />
              </Col>
            </Row>

            <Row>
              <Col className="offset-3 justify-content-center mt-4 px-3" xs={6}>
                <MyButton type="submit" className="submit ms-auto me-auto wide">
                  Send Request
                </MyButton>
                <MyButton
                  clickHandler={() => {
                    userContext.addImage(null, "campaign");
                  }}
                  className="submit ms-auto me-auto wide change mt-2"
                >
                  Change image
                </MyButton>
              </Col>
            </Row>
          </Container>
        </Form>
      </Formik>
    </>
  );
};

const ChoosingBillboard = () => {
  const userContext = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState(null);
  const [billboards, setBillboards] = useState([]);
  let [mapConfig, setMapConfig] = useState({
    latitude: 31.0444,
    longitude: 31.2357,
    zoom: 2.5,
  });

  const [myCountries, setAllCountries] = useState([]);
  const [myStates, setAllStates] = useState(null);
  const [myCities, setAllCities] = useState(null);

  const handleClick = (chosenType) => {
    setType(chosenType);
  };

  const [selectedBillboard, setSelectedBillboard] = useState(null);
  const [displayBillboards, setDisplayBillboards] = useState([]);

  const handlePayement = () => {
    if (displayBillboards.length === 0) {
      setError("No billboards selected, please select one atleast");
      return;
    }
    setLoading(true);
    let campaignData = userContext.campaignData;
    campaignData.billboards = displayBillboards;
    userContext.addCampaign(campaignData);
    axios
      .post("http://localhost:8000/display/payement", campaignData, config)
      .then((response) => {
        console.log(response);

        userContext.addPrice(response.data.price);
        setTimeout(() => {
          console.log(userContext.price);
          setLoading(false);
        }, 800);
      })
      .catch((error) => {
        setError(
          "an Error has occured please check your network or try again later"
        );
        console.log(error);
      });
  };

  const choosingBillboard = (billboard) => {
    setSelectedBillboard(billboard);
    let myList = [];
    if (displayBillboards.includes(billboard.id)) {
      displayBillboards.splice(displayBillboards.indexOf(billboard.id), 1);
      myList = displayBillboards;
      setDisplayBillboards(myList);
      console.log(myList);
      return;
    }
    myList = displayBillboards;
    myList.push(billboard.id);
    console.log(myList);
    setDisplayBillboards(myList);
  };

  const handleMapFormChange = (e) => {
    setLoading(true);
    if (e.target.name === "country") {
      let myCountry = Country.getCountryByCode(e.target.value);
      let statesList = State.getStatesOfCountry(e.target.value);
      let myStatesList = statesList.map((state) => {
        return {
          name: state.name,
          code: `${state.countryCode} ${state.isoCode}`,
        };
      });
      setAllStates(myStatesList);
      setAllCities(null);
    }

    if (e.target.name === "state") {
      let selectedOptions = Array.from(e.target.selectedOptions);

      selectedOptions = selectedOptions.map((elem) => elem.value);
      console.log(selectedOptions);
      let citiesList = [];
      selectedOptions.forEach((elem) => {
        let myString = elem.split(" ");
        citiesList.push(...City.getCitiesOfState(myString[0], myString[1]));
      });
      // citiesList = citiesList.map((elem) => {
      //   console.log(elem)
      //   return {
      //     name: elem.name,
      //   };
      // });
      console.log(citiesList);
      setAllCities(citiesList);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/billboard/")
      .then((response) => {
        console.log(response.data);
        setBillboards(response.data);
        setLoading(false);
      })
      .catch((error) => setError(error.response.message));
    let countriesList = Country.getAllCountries();
    let myCountriesList = countriesList.map((country) => {
      return { name: country.name, code: country.isoCode };
    });

    setAllCountries(myCountriesList);
  }, []);
  return (
    <>
      {loading && <LoadingSpinner asOverlay />}
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {!type && (
        <>
          <MyButton
            clickHandler={() => handleClick("individual")}
            className="submit change ms-auto me-auto wide py-2 my-2"
          >
            Choose billboards individually
          </MyButton>
          <MyButton
            clickHandler={() => handleClick("area")}
            className="submit change ms-auto me-auto wide py-2 my-2"
          >
            Choose billboards by area
          </MyButton>
        </>
      )}

      {type === "individual" && (
        <>
          <MyMap
            mapConfig={mapConfig}
            setMapConfig={setMapConfig}
            location="modal"
            billboards={billboards}
            pinClickHandler="chooseBillboard"
            setSelectedBillboard={choosingBillboard}
            selectedBillboard={selectedBillboard}
          />
          <Row className="mt-4 mb-2">
            {selectedBillboard && (
              <MyCard
                className="billboard-card w-75 ms-auto me-auto form"
                billboard={selectedBillboard}
              />
            )}
          </Row>
          <MyButton
            clickHandler={() => handlePayement()}
            className="submit change ms-auto me-auto wide py-2 my-2"
          >
            To Payement
          </MyButton>
        </>
      )}

      {type === "area" && (
        <Formik
          initialValues={{
            city: [],
            state: [],
            country: "",
            // added for our select
          }}
          validationSchema={Yup.object({
            city: Yup.array(),
            state: Yup.array(),
            country: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            if (values.state.length === 0) {
              setError("You have to choose atleast one state");
              return;
            }
            let campaignData = userContext.campaignData;
            campaignData.country = values.country;
            campaignData.state = values.state;
            campaignData.city = values.city;
            userContext.addCampaign(campaignData);
            axios
              .post(
                "http://localhost:8000/display/payement",
                campaignData,
                config
              )
              .then((response) => {
                userContext.addPrice(response.data.price);
                setTimeout(() => {
                  setLoading(false);
                }, 800);
              })
              .catch((error) => {
                setError(
                  "an Error has occured please check your network or try again later"
                );
                setTimeout(() => {
                  setLoading(false);
                }, 800);
                console.log(error);
              });

            setSubmitting(true);
            setLoading(true);
          }}
        >
          {(formik) => (
            <Form
              onChange={(e) => {
                if (e.target.name === "country") {
                  formik.resetForm();
                  formik.setFieldValue("country", e.target.value);
                }

                handleMapFormChange(e);
              }}
            >
              <Container className="justify-content-center">
                <Row>
                  <Col sm={10} className="offset-1">
                    <MySelect label="Country" name="country">
                      <option value="NA" disabled>
                        Select Country
                      </option>
                      {myCountries.map((elem, index) => {
                        return (
                          <option key={`country-${index}`} value={elem.code}>
                            {elem.name}
                          </option>
                        );
                      })}
                    </MySelect>
                    {myStates && (
                      <MySelect label="State" name="state" multiple>
                        {myStates.map((elem, index) => {
                          return (
                            <option key={`state-${index}`} value={elem.code}>
                              {elem.name}
                            </option>
                          );
                        })}
                      </MySelect>
                    )}
                    {myCities && (
                      <MySelect label="City" name="city" multiple>
                        {myCities.map((elem, index) => {
                          return (
                            <option key={`cities-${index}`} value={elem.name}>
                              {elem.name}
                            </option>
                          );
                        })}
                      </MySelect>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col
                    className="offset-3 justify-content-center mt-4 px-3"
                    xs={6}
                  >
                    <MyButton
                      type="submit"
                      className="submit ms-auto me-auto wide"
                    >
                      To Payment
                    </MyButton>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      )}
      {type && (
        <Row>
          <Col className="offset-3 justify-content-center mt-4 px-3" xs={6}>
            <MyButton
              className="submit change ms-auto me-auto wide"
              clickHandler={() => handleClick(null)}
            >
              change billboard select type
            </MyButton>
          </Col>
        </Row>
      )}
    </>
  );
};

const Payment = () => {
  const userContext = useUserContext();
  const [payKey, setPayKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    // axios
    //   .post("http://localhost:8000/display/", {}, config)
    //   .then((response) => {
    //     console.log(response);
    //     setPayKey(response.data.token)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const submitPayment = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("billboards", userContext.campaignData.billboards);
    formData.append("startTime", userContext.campaignData.startTime);
    formData.append("endTime", userContext.campaignData.endTime);
    formData.append("startDate", userContext.campaignData.startDate);
    formData.append("endDate", userContext.campaignData.endDate);
    formData.append("frequency", userContext.campaignData.frequency);
    formData.append("duration", userContext.campaignData.duration);
    formData.append("file", userContext.campaignImage);
    console.log(userContext.campaignData);
    axios
      .post("http://localhost:8000/display/", formData, config)
      .then((response) => {
        console.log(response);
        setSuccess(response.data.message);
        setError(null);
        setLoading(false);
        
      })
      .catch((error) => {
        setSuccess(null);
        setError(error.response.data.message);
        setLoading(false);
        
      });
  };
  return (
    <>
      {loading && <LoadingSpinner asOverlay />}
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {success && <Alert variant={"success"}>{success}</Alert>}
      {payKey && (
        <Row>
          <iframe
            src={`https://accept.paymob.com/api/acceptance/iframes/381127?payment_token=${payKey}`}
            width={400}
            height={400}
          >
            {" "}
          </iframe>
        </Row>
      )}
      <Row>
        <Col className="offset-3 justify-content-center mt-4 px-3" xs={6}>
          <MyButton
            className="submit change ms-auto me-auto wide"
            clickHandler={() => userContext.addPrice(null)}
          >
            change billboard select type
          </MyButton>
        </Col>
      </Row>
      <Row>
        <Col className="offset-3 justify-content-center mt-4 px-3" xs={6}>
          <MyButton
            className="submit ms-auto me-auto wide"
            clickHandler={() => submitPayment()}
          >
            Pay {userContext.price}$
          </MyButton>
        </Col>
      </Row>
    </>
  );
};

export {
  SignupForm,
  LoginForm,
  MapForm,
  ImageForm,
  BillboardForm,
  CampaignForm,
  ChoosingBillboard,
  Payment,
};
