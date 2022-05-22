import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import MyButton from "../../shared/Button";

import "./MyBillboard.css";
const CampaignDescription = (props) => {
  const campaign = props.campaign;
  return (
    <>
      <td>{campaign.startDate.split("T")[0]}</td>
      <td>{campaign.endDate.split("T")[0]}</td>
      <td>{campaign.display[0].TimeSlot.StartTime}</td>
      <td> {campaign.display[0].TimeSlot.EndTime}</td>
      <td> {campaign.frequency} times</td>
      <td>{campaign.duration} seconds</td>
      <td>{campaign.price} $</td>
      <td>{campaign.display.length}</td>
      <td>
        <Card.Img
          className="img-fluid card-image"
          variant="top"
          src={campaign.imageLink}
        />
      </td>
      {props.show && (
        <td>
          <MyButton
            className="submit ms-auto me-auto wide"
            clickHandler={() => {
              props.handleAccept(campaign.id, "Campaign");
            }}
          >
            Accept
          </MyButton>
          <MyButton
            className="submit-danger ms-auto me-auto mt-3 wide"
            clickHandler={() => {
              props.handleReject(campaign.id, "Campaign");
            }}
          >
            Reject
          </MyButton>
        </td>
      )}
      {/* <Card
        className={`${props.className} my-rounded billboard-card my-2 mb-4`}
      >
        <Card.Img
          className="my-rounded card-image ml-auto mr-auto"
          variant="top"
          src={campaign.imageLink}
        />
        {!props.showInfo && (
          <Card.Title className="mt-2 mb-n4 text-center me-auto ms-auto">
            Selected billboard info
          </Card.Title>
        )}
        <Card.Body className="justify-content-center text-center d-flex align-items-center row mt-n1">
          <Row className=" card-text">
            <Col>Start Date : {campaign.startDate.split("T")[0]}</Col>
            <Col>End Date : {campaign.endDate.split("T")[0]}</Col>
          </Row>
          <Row className=" card-text">
            <Col>Start Time : {campaign.display[0].TimeSlot.StartTime}</Col>
            <Col>End Time : {campaign.display[0].TimeSlot.EndTime}</Col>
          </Row>
          <Row className=" card-text">
            <Col>Frequency : {campaign.frequency}</Col>
            <Col>Duration : {campaign.duration}</Col>
          </Row>
          <Row className=" card-text">
            No. of Billboards: {campaign.display.length}
          </Row>
        </Card.Body>
      </Card> */}
    </>
  );
};

export default CampaignDescription;
