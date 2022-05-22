import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./MyBillboard.css";
const MyCard = (props) => {
  const billboard = props.billboard;
  return (
    <Card className={`${props.className} my-rounded`}>
      <Card.Img
        className="card-image ml-auto mr-auto"
        variant="top"
        src={billboard.imageLink}
      />
      <Card.Body className="justify-content-center text-center align-items-center row mt-n1">
        <Row>
          <Col>
            <h1 className=" card-text">
              Aspect Ratio
              <br />
              {billboard.aspectRatio}
            </h1>
          </Col>
          <Col>
            <h1 className=" card-text">
              Rate <br /> {billboard.rate}$ per hour
            </h1>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <h1 className=" card-text">
              {billboard.address.street}st, {billboard.address.city} city,{" "}
              {billboard.address.country}
            </h1>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
