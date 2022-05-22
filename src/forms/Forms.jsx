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
  const [isAgency, setIsAgency] = useState(false);
  return (
    <>
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {loading && <LoadingSpinner asOverlay />}
      {!isAgency && (
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
                <Col
                  className="offset-3 justify-content-center mt-4 px-3"
                  xs={6}
                >
                  <MyButton
                    type="submit"
                    className="submit ms-auto me-auto wide"
                  >
                    Sign up
                  </MyButton>
                </Col>
              </Row>
              <Row>
                <Col
                  className="offset-3 justify-content-center mt-4 px-3"
                  xs={6}
                >
                  <MyButton
                    className="submit change ms-auto me-auto wide"
                    clickHandler={() => {
                      setIsAgency(true);
                    }}
                  >
                    Agency ?
                  </MyButton>
                </Col>
              </Row>
            </Container>
          </Form>
        </Formik>
      )}
      {isAgency && (
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
            name: "",
            mobile: "", // added for our select
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
            name: Yup.string().required("Required"),
            mobile: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setLoading(true);
            axios
              .post("http://localhost:8000/agency/register", values, config)
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
              <Row className="justify-content-center">
                <Col xs={10} className="mx-1 offset-1">
                  <MyTextInput
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Jane"
                  />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={10} className="mx-1 offset-1">
                  <MyTextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Must be at least 8 characters"
                  />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={10} className="mx-1 offset-1">
                  <MyTextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="jane@formik.com"
                  />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm={5} xs={12} className="mx-1">
                  <MyTextInput
                    label="Agency Name"
                    name="name"
                    type="text"
                    placeholder=""
                  />
                </Col>
                <Col sm={5} xs={12} className="mx-1">
                  <MyTextInput
                    label="Mobile number"
                    name="mobile"
                    type="text"
                    placeholder="+201002121234"
                  />
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
                    Sign up
                  </MyButton>
                </Col>
              </Row>
              <Row>
                <Col
                  className="offset-3 justify-content-center mt-4 px-3"
                  xs={6}
                >
                  <MyButton
                    className="submit change ms-auto me-auto wide"
                    clickHandler={() => {
                      setIsAgency(false);
                    }}
                  >
                    Client ?
                  </MyButton>
                </Col>
              </Row>
            </Container>
          </Form>
        </Formik>
      )}
    </>
  );
};

const LoginForm = (props) => {
  const userContext = useUserContext();

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
  const [image, setImage] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const userContext = useUserContext();

  return (
    <div className="justify-content-center mt-3">
      <h1 className="display-4 text-center mb-n5 fs-3">Image</h1>
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {success && <Alert variant={"success"}>{success}</Alert>}
      {loading && <LoadingSpinner asOverlay />}
      <Formik
        initialValues={{ file: null }}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);

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
            <div className="justify-content-center text-center">
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
                      if (!event.target.files[0]) {
                        return;
                      }
                      setLoading(true);
                      setImage(URL.createObjectURL(event.target.files[0]));
                      formik.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                      const formData = new FormData();
                      const file = event.target.files[0];
                      formData.append("file", file);
                      userContext.addImage(file, props.type);
                      if (props.type === "campaign") {
                        axios
                          .post(
                            "http://localhost:8000/display/image",
                            formData,
                            {
                              withCredentials: true,
                            }
                          )
                          .then((response) => {
                            console.log(response.data);
                            setResponseResult(response.data);
                            setLoading(false);
                          })
                          .catch((error) => {
                            setError(
                              "an error has occured please try again later"
                            );
                            setLoading(false);
                            console.log(error);
                          });
                        return;
                      }
                    }}
                    className="text-input"
                  />

                  {formik.touched.file && formik.errors.file ? (
                    <div className="error form-text mt-1 justify-content-center text-center mb-n1">
                      {formik.errors.file}
                    </div>
                  ) : null}
                </Row>
                {image && (
                  <Row className="mt-2">
                    <Col xs={12}>
                      <img
                        src={image}
                        alt="preview image"
                        className="form-image"
                      />
                    </Col>
                  </Row>
                )}
                <Row className="mt-2">
                  <Col xs={12} className=" justify-content-center text-center">
                    {responseResult && (
                      <>
                        <h1 className="display-4 fs-5">Your Results</h1>
                        <Alert
                          variant={
                            responseResult.area * 100 > 20
                              ? responseResult.area * 100 > 25
                                ? "danger"
                                : "success"
                              : "warning"
                          }
                        >{`The total text area in your image is ${(
                          responseResult.area * 100
                        ).toFixed(2)}% `}</Alert>
                      </>
                    )}
                  </Col>
                </Row>
                {props.type === "campaign" && (
                  <Row className="mt-2">
                    <Col xs={12} className="justify-content-center text-center">
                      <h1 className="display-4 fs-6">
                        It is recommended to have from 6 words to 8 words in
                        your AD. <br />
                        Text is recommended to cover between 20% and 25% of your
                        whole image
                      </h1>
                    </Col>
                  </Row>
                )}
                {!(props.type === "campaign") && (
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
                )}
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

const CampaignImageForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [image, setImage] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const userContext = useUserContext();

  return (
    <>
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {success && <Alert variant={"success"}>{success}</Alert>}
      {loading && <LoadingSpinner asOverlay campaignImage={true} />}
      <Row className="justify-content-start mt-2 align-items-center">
        <Col xs={2}>
          <h1 className="display-4 label-header text-end pe-3 me-5 fs-3">
            Image
          </h1>
        </Col>
        <Col>
          <Formik
            initialValues={{ file: null }}
            onSubmit={(values, { setSubmitting }) => {
              setLoading(true);

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
                <div className="justify-content-center text-center">
                  <form onSubmit={formik.handleSubmit}>
                    <Row className="justify-content-start ml-auto mr-auto align-items-center">
                      <Col sm={6}>
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
                            if (!event.target.files[0]) {
                              return;
                            }
                            setLoading(true);
                            setImage(
                              URL.createObjectURL(event.target.files[0])
                            );
                            formik.setFieldValue(
                              "file",
                              event.currentTarget.files[0]
                            );
                            const formData = new FormData();
                            const file = event.target.files[0];
                            formData.append("file", file);
                            userContext.addImage(file, props.type);
                            if (props.type === "campaign") {
                              axios
                                .post(
                                  "http://localhost:8000/display/image",
                                  formData,
                                  {
                                    withCredentials: true,
                                  }
                                )
                                .then((response) => {
                                  console.log(response.data);
                                  setResponseResult(response.data);
                                  setLoading(false);
                                })
                                .catch((error) => {
                                  setError(
                                    "an error has occured please try again later"
                                  );
                                  setLoading(false);
                                  console.log(error);
                                });
                              return;
                            }
                          }}
                          className="text-input"
                        />

                        {formik.touched.file && formik.errors.file ? (
                          <div className="error form-text mt-1 justify-content-center text-center mb-n1">
                            {formik.errors.file}
                          </div>
                        ) : null}
                        <Row className="mt-2">
                          <Col
                            xs={12}
                            className=" justify-content-center text-center"
                          >
                            {responseResult && (
                              <>
                                <h1 className="display-4 fs-5">Your Results</h1>
                                <Alert
                                  variant={
                                    responseResult.area * 100 > 20
                                      ? responseResult.area * 100 > 25
                                        ? "danger"
                                        : "success"
                                      : "warning"
                                  }
                                >{`The total text area in your image is ${(
                                  responseResult.area * 100
                                ).toFixed(2)}% `}</Alert>
                              </>
                            )}
                          </Col>
                        </Row>
                        {props.type === "campaign" && (
                          <Row className="mt-2">
                            <Col
                              xs={12}
                              className="justify-content-center text-center"
                            >
                              <h1 className="display-4 fs-6">
                                It is recommended to have from 6 words to 8
                                words in your AD. <br />
                                Text is recommended to cover between 20% and 25%
                                of your whole image
                              </h1>
                            </Col>
                          </Row>
                        )}
                      </Col>
                      {image && (
                        <Col className="">
                          <img
                            src={image}
                            alt="preview image"
                            className="form-image"
                          />
                        </Col>
                      )}
                    </Row>

                    {!(props.type === "campaign") && (
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
                    )}
                  </form>
                </div>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </>
  );
};

const BillboardForm = (props) => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
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
              setDisabled(true);
              setLoading(false);
              setSuccess(response.data.message);
            })
            .catch((error) => {
              setSuccess(null);
              setSubmitting(false);
              setLoading(false);
              setDisabled(true);
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
              <Col className="offset-2 justify-content-center mt-4 px-3" xs={8}>
                <MyButton
                  type="submit"
                  disabled={disabled}
                  className="submit ms-auto me-auto wide"
                >
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
      <Row className="justify-content-start mt-3 align-items-center">
        <Col xs={2}>
          <h1 className="display-4 label-header text-end pe-3 me-5 fs-3">
            Date, Time & Duration
          </h1>
        </Col>
        <Col>
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
                    schema.min(
                      startTime,
                      "Must be after the desired start time"
                    )
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
              let enteredData = userContext.campaignData;

              userContext.addCampaign({ ...enteredData, ...values });
              setTimeout(() => setLoading(false), 300);

              console.log(values);
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ ...props }) => {
              return (
                <Form
                  onChange={(e) => {
                    props.validateForm().then(() => {
                      props.handleSubmit();
                      return;
                    });

                    userContext.setGlobalFormError(
                      "Complete the required fields"
                    );
                    userContext.addPrice(0);
                  }}
                >
                  <Row>
                    <Col sm={4} xs={6} className="px-3">
                      <MyTextInput
                        label="Starting date"
                        name="startDate"
                        type="date"
                        placeholder="Starting date 31/12/2021"
                      />
                    </Col>
                    <Col sm={4} xs={6} className="px-3">
                      <MyTextInput
                        label="Ending date"
                        name="endDate"
                        type="date"
                        placeholder="Ending date 31/12/2021"
                      />
                    </Col>
                    <Col sm={4} xs={6} className="px-3">
                      <MyTextInput
                        label="Duration in seconds"
                        name="duration"
                        type="number"
                        placeholder="duration of ad on screen"
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col sm={4} xs={6} className="px-3">
                      <MyTextInput
                        label="Starting Time"
                        name="startTime"
                        type="number"
                        placeholder="time in 24hr format"
                      />
                    </Col>
                    <Col sm={4} xs={6} className="px-3">
                      <MyTextInput
                        label="Ending Time"
                        name="endTime"
                        type="number"
                        placeholder="time in 24hr format"
                      />
                    </Col>
                    <Col sm={4} xs={6} className="px-3">
                      <MyTextInput
                        label="Frequency"
                        name="frequency"
                        type="number"
                        placeholder="times your ad is shown"
                      />
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
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
    const campaignData = userContext.campaignData;
    if (chosenType === "individual") {
      campaignData.city = null;
      campaignData.state = null;
      campaignData.country = null;
      userContext.addCampaign(campaignData);
    }
    if (chosenType === "area") {
      campaignData.billboards = [];
      userContext.addCampaign(campaignData);
    }

    userContext.addPrice("please choose area or billboard to get price");
  };

  const [selectedBillboard, setSelectedBillboard] = useState(null);
  const [displayBillboards, setDisplayBillboards] = useState([]);
  const [displayBillboardsInfo, setDisplayInfo] = useState([]);

  const handlePayement = () => {
    let campaignData = userContext.campaignData;
    campaignData.billboards = displayBillboards;
    campaignData.country = null;
    campaignData.state = null;
    campaignData.city = null;
    userContext.addCampaign(campaignData);
  };

  const choosingBillboard = (billboard) => {
    setSelectedBillboard(billboard);
    let myList = [];
    let myInfoList = [];
    if (displayBillboards.includes(billboard.id)) {
      const index = displayBillboards.indexOf(billboard.id);
      displayBillboardsInfo.splice(index, 1);
      displayBillboards.splice(index, 1);
      myList = displayBillboards;
      myInfoList = displayBillboardsInfo;
      setDisplayBillboards(myList);
      setDisplayInfo(myInfoList);
      handlePayement();

      return;
    }
    myInfoList = displayBillboardsInfo;
    myList = displayBillboards;
    myList.push(billboard.id);
    myInfoList.push(billboard);
    setDisplayInfo(myInfoList);
    setDisplayBillboards(myList);
    handlePayement();
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
      <Row className="justify-content-start mt-3 align-items-center">
        <Col xs={2}>
          <h1 className="display-4 label-header text-end pe-3 me-5 fs-3">
            Location
          </h1>
        </Col>
        <Col>
          {!type && (
            <Row>
              <Col>
                <MyButton
                  clickHandler={() => handleClick("individual")}
                  className="submit change ms-auto me-auto wide py-2 my-2"
                >
                  Choose billboards individually
                </MyButton>
              </Col>
              <Col>
                <MyButton
                  clickHandler={() => handleClick("area")}
                  className="submit change ms-auto me-auto wide py-2 my-2"
                >
                  Choose billboards by area
                </MyButton>
              </Col>
            </Row>
          )}

          {type === "individual" && (
            <Row>
              <Col xs={8}>
                <MyMap
                  mapConfig={mapConfig}
                  setMapConfig={setMapConfig}
                  location="modal"
                  billboards={billboards}
                  pinClickHandler="chooseBillboard"
                  setSelectedBillboard={choosingBillboard}
                  selectedBillboard={selectedBillboard}
                />
              </Col>
              <Col>
                <h1 className="display-4 fs-3">selected billboards:</h1>
                <ul>
                  {displayBillboardsInfo &&
                    displayBillboardsInfo.map((elem, index) => (
                      <li className="list-item" key={`selectedBill-${index}`}>
                        {elem.address.street}, {elem.rate}$ per hour
                      </li>
                    ))}
                </ul>
              </Col>
            </Row>
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
                let campaignData = userContext.campaignData;
                campaignData.country = values.country;
                campaignData.state = values.state;
                campaignData.city = values.city;
                campaignData.billboards = null;
                userContext.addCampaign(campaignData);
              }}
            >
              {(formik) => (
                <Form
                  onChange={(e) => {
                    if (e.target.name === "country") {
                      formik.resetForm();
                      formik.setFieldValue("country", e.target.value);
                    }
                    if (e.target.name === "state") {
                      let country = formik.values.country;
                      formik.resetForm();
                      formik.setFieldValue("country", country);
                      let selectedOptions = Array.from(
                        e.target.selectedOptions
                      );
                      selectedOptions = selectedOptions.map(
                        (elem) => elem.value
                      );
                      formik.setFieldValue("state", selectedOptions);
                    }
                    handleMapFormChange(e);
                    formik.handleSubmit();
                  }}
                >
                  <Row>
                    <Col className="mx-2">
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
                    </Col>
                    <Col className="mx-2">
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
                    </Col>
                    <Col className="mx-2">
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
                </Form>
              )}
            </Formik>
          )}
          {type && (
            <Row>
              <Col className="offset-2 justify-content-center mt-4 px-3" xs={8}>
                <MyButton
                  className="submit change ms-auto me-auto wide"
                  clickHandler={() => handleClick(null)}
                >
                  change billboard select type
                </MyButton>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
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

  const submitPayment = () => {};
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
  CampaignImageForm,
};
