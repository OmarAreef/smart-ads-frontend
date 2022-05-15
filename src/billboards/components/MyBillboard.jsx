import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./MyBillboard.css";
const MyCard = (props) => {
  const billboard = props.billboard;
  return (
    <Card className={`${props.className} my-rounded`}>
      <Card.Img
        className="my-rounded card-image ml-auto mr-auto"
        variant="top"
        src={billboard.imageLink}
      />
      {!props.showInfo && <Card.Title className="mt-2 mb-n4 text-center me-auto ms-auto">Selected billboard info</Card.Title>}
      <Card.Body className="justify-content-center text-center d-flex align-items-center row mt-n1">
        <Row className=" card-text">
          Aspect Ratio : {billboard.aspectRatio}
          <br />
          Rate : {billboard.rate}$ per hour
        </Row>
        <Row className=" card-text">
          street address : {billboard.address.street}st,{" "}
          {billboard.address.city} city
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
