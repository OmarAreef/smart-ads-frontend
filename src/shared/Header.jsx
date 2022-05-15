import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import MyModal from "./MyModal.jsx";
import { LoginForm, SignupForm } from "../forms/Forms";
import axios from "axios";
import { useUserContext } from "../user.context";
import "./Header.css";
const Header = (props) => {
  const userContext = useUserContext();

  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showSign, setShowSign] = useState(false);
  const handleCloseSign = () => setShowSign(false);
  const handleShowSign = () => setShowSign(true);

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
    <Navbar expand="lg" className={` ${props.className} w-100  pb-0 `}>
      <Container className="w-100">
        <MyModal
          show={showLogin}
          handleClose={handleCloseLogin}
          title={"Login"}
        >
          <LoginForm></LoginForm>
        </MyModal>
        <MyModal
          show={showSign}
          handleClose={handleCloseSign}
          title={"Sign up"}
        >
          <SignupForm></SignupForm>
        </MyModal>
        {/* <Navbar.Brand>React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto"
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
              </>
            )}
            {userContext.role && (
              <>
                <Nav.Link className="link" eventKey="logOut">
                  Log out
                </Nav.Link>
                <Nav.Link className="link">
                  <Link to="/requests"> Requests </Link>
                </Nav.Link>
              </>
            )}

            <Nav.Link className="link">
              <Link to="/billboards"> Billboards </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
