import React, { useState } from "react";
import { Navbar, Container, Nav, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyButton from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import MyModal from "./MyModal.jsx";
import {
  LoginForm,
  SignupForm,
  CampaignForm,
  ChoosingBillboard,
  CampaignImageForm,
  ImageForm,
  BillboardForm,
} from "../forms/Forms";
import axios from "axios";
import { useUserContext } from "../user.context";
import "./Header.css";

const Header = (props) => {
  const userContext = useUserContext();
  const [showCampaign, setShowCampaign] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showSign, setShowSign] = useState(false);
  const handleCloseSign = () => setShowSign(false);
  const handleShowSign = () => setShowSign(true);
  const [showBillboard, setShowBillboard] = useState(false);

  const showSelected = (key) => {
    if (key === "login") {
      handleShowLogin();
    }
    if (key === "signUp") {
      handleShowSign();
    }
    if (key === "logOut") {
      axios.post("http://localhost:8000/user/logout").then((response) => {
        userContext.logout();
      });
    }
  };
  return (
    <Navbar expand="lg" className={` ${props.className} w-100  py-0 header`}>
      <Container className="w-100 px-1">
        <MyModal
          show={showLogin}
          handleClose={handleCloseLogin}
          title={"Login"}
        >
          <LoginForm closeModal={handleCloseLogin}></LoginForm>
        </MyModal>
        <MyModal
          show={showSign}
          handleClose={handleCloseSign}
          title={"Sign up"}
        >
          <SignupForm closeModal={handleCloseLogin}></SignupForm>
        </MyModal>
        <MyModal
          show={showBillboard}
          handleClose={() => setShowBillboard(false)}
          title={"New Billboard"}
          className="billboard-modal"
        >
          {(!userContext.billboardImage || !userContext.next) && (
            <ImageForm type="billboard"></ImageForm>
          )}
          {userContext.billboardImage && userContext.next && <BillboardForm />}
        </MyModal>
        <MyModal
          show={showCampaign}
          handleClose={() => setShowCampaign(false)}
          title={"New Campaign"}
          className=" d-flex flex-column align-items-center pb-0 p-1 overflow-hidden"
          fullscreen={true}
        >
          {loadingSubmit && <LoadingSpinner asOverlay />}
          <Container className="mx-1 campaign-container py-2 pb-3 px-4  h-100 custom-scrollbar-css">
            <Row className="justify-content-even align-items-start ">
              <Col sm={12}>
                <CampaignImageForm type="campaign"></CampaignImageForm>
              </Col>
            </Row>
            <hr />
            <Row className="justify-content-even align-items-start ">
              <Col sm={12}>
                <CampaignForm />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12}>
                <ChoosingBillboard />
              </Col>
            </Row>
          </Container>
          {userContext.globalFormError && (
            <Alert variant={"danger"}>{userContext.globalFormError}</Alert>
          )}
          {userContext.globalFormSuccess && (
            <Alert variant={"success"}>{userContext.globalFormSuccess}</Alert>
          )}
          <Row className="bg-dark mt-auto py-2 mb-1 px-0  w-100 align-self-center align-items-center modal-header ">
            <Col className="offset-1" xs={7}>
              <h1 className="display-5 my-0">
                Total checkout payment : {userContext.price} $
              </h1>
            </Col>
            <Col xs={2} className="offset-2">
              <MyButton
                className="billboard-button submit py-2 px-2"
                clickHandler={() =>
                  userContext.createCampaign(setLoadingSubmit)
                }
                disabled={userContext.disabled}
                variant={"success"}
              >
                Create campaign
              </MyButton>
            </Col>
          </Row>
        </MyModal>
        {!props.className.includes("landing_navbar") && (
          <Navbar.Brand className="d-flex align-items-center">
            <Link to="/" className="link-header d-flex align-items-center">
              <img alt="" src="./assests/logo.png" height="41" />
              BillyADs
            </Link>
          </Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto align-items-center"
            onSelect={(selectedKey) => {
              showSelected(selectedKey);
            }}
          >
            {!userContext.role && (
              <>
                <Nav.Link className="link" eventKey="signUp">
                  Sign up
                </Nav.Link>
                <Nav.Link className="link" eventKey="login">
                  Login
                </Nav.Link>

                <Link className="link nav-link" to="/billboards">
                  {" "}
                  Billboards{" "}
                </Link>
              </>
            )}
            {userContext.role && userContext.role === "agency" && (
              <>
                <MyButton
                  className="billboard-button py-1 my-1 px-3 mx-1 align-items-center"
                  clickHandler={() => setShowBillboard(true)}
                >
                  New Billboard
                </MyButton>
                <Link to="/agency/requests" className="link nav-link">
                  {" "}
                  Requests{" "}
                </Link>
                <Link to="/billboards" className="link nav-link">
                  {" "}
                  Billboards{" "}
                </Link>
              </>
            )}
            {userContext.role && userContext.role === "Client" && (
              <>
                <MyButton
                  className="billboard-button py-1 my-1 px-3 mx-1 align-items-center"
                  clickHandler={() => {
                    setShowCampaign(true);
                    userContext.resetCampaign();
                  }}
                >
                  New Campaign
                </MyButton>
                <Link to="/user/requests" className="link nav-link">
                  {" "}
                  Requests{" "}
                </Link>

                <Link to="/billboards" className="link nav-link">
                  {" "}
                  Billboards{" "}
                </Link>
              </>
            )}
            {userContext.role && userContext.role === "Admin" && (
              <Link to="/admin" className="link nav-link">
                {" "}
                Requests{" "}
              </Link>
            )}
            {userContext.role && (
              <>
                <Nav.Link className="link logout" eventKey="logOut">
                  Log out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
