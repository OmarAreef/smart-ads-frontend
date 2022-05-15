import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import "./MyModal.css";
const ModalOverlay = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      dialogClassName={`justify-content-center ${props.className}`}
    >
      <Modal.Header closeButton className="bg-dark rounded-3 ">
        <Modal.Title className="display-5 Modal-title ">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

const MyModal = (props) => {
  return (
    <>
      <ModalOverlay {...props} />
    </>
  );
};

export default MyModal;
