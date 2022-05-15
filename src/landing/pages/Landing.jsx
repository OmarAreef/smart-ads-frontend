import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import MyButton from "../../shared/Button";
import { SignupForm } from "../../forms/Forms";
import Header from "../../shared/Header";
import MyModal from "../../shared/MyModal";
import LoadingSpinner from "../../shared/LoadingSpinner";
import axios from "axios";
import "./Landing.css";
const Landing = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <Container fluid className="landing_background ">
      {loading && <LoadingSpinner asOverlay />}
      <MyModal show={show} handleClose={handleClose} title={"Sign up now"}>
        <SignupForm></SignupForm>
      </MyModal>

      <Header className="landing_navbar"></Header>
      <Row className="justify-content-center align-items-center content">
        <Col md={5} xs={0}>
          <img
            src="../assests/web.png"
            alt=""
            onLoad={() => setTimeout(setLoading(false), 500)}
            className="LandingImage img-fluid mt-n5"
          ></img>
        </Col>
        <Col xs={12} sm={7} className="animateRight">
          <Row>
            <h1 className="landing_title text-center display-1">
              Brand your Business <br /> & Billboard
            </h1>
          </Row>
          <Row className="justify-content-center align-items-center mt-3">
            <Col md={6} xs={10} className="">
              <MyButton
                className="landing_active wide"
                clickHandler={handleShow}
              >
                Get Started
              </MyButton>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* <a href="https://www.freepik.com/vectors/sky-background">
        Sky background vector created by macrovector - www.freepik.com
      </a>
      <a href='https://www.freepik.com/vectors/ads'>Ads vector created by vectorjuice - www.freepik.com</a> */}
    </Container>
  );
};

export default Landing;
