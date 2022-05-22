import React from "react";
import Button from "react-bootstrap/Button";
import "./Button.css";
const MyButton = (props) => {
  const type = props.type ? "submit" : "button";
  return (
    <Button
      onClick={() => (props.clickHandler ? props.clickHandler() : null)}
      className={`my_button ${props.className}`}
      type={type}
      disabled={props.disabled}
      variant={props.variant}
    >
      {props.children}
    </Button>
  );
};

export default MyButton;
