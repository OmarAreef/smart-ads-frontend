import React, { useState } from "react";
import { Card } from "react-bootstrap";
import MyMap from "../../billboards/components/MyMap";
import MyButton from "../../shared/Button";
import "./MyBillboard.css";

const BillboardDescription = (props) => {
  const billboard = props.billboard;
  const [mapConfig, setMapConfig] = useState({
    latitude: billboard.Coordinates.latitude,
    longitude: billboard.Coordinates.longitude,
    zoom: 12.5,
  });

  return (
    <>
      <td>{billboard.aspectRatio}</td>
      <td>{billboard.rate}$</td>
      <td>{billboard.address.street} st</td>
      <td>{billboard.address.city}</td>
      <td>{billboard.address.country}</td>
      <td>
        <Card.Img
          className="img-fluid card-image"
          variant="top"
          src={billboard.imageLink}
        />
      </td>
      <td>
        <MyMap
          mapConfig={mapConfig}
          setMapConfig={setMapConfig}
          billboards={[billboard]}
          location="table"
        />
      </td>
      {props.show && (
        <td>
          <MyButton
            className="submit ms-auto me-auto wide"
            clickHandler={() => {
              props.handleAccept(billboard.id, "Billboard");
            }}
          >
            Accept
          </MyButton>
          <MyButton
            className="submit-danger ms-auto me-auto mt-3 wide"
            clickHandler={() => {
              props.handleReject(billboard.id, "Billboard");
            }}
          >
            Reject
          </MyButton>
        </td>
      )}
      {/* <Row className="px-2 my-2 justify-content-center">
        <Card className={`${props.className} my-rounded billboard-card`}>
          <Card.Img
            className="my-rounded card-image ml-auto mr-auto"
            variant="top"
            src={billboard.imageLink}
          />
          {!props.showInfo && (
            <Card.Title className="mt-2 mb-n4 text-center me-auto ms-auto">
              Selected billboard info
            </Card.Title>
          )}
          <Card.Body className="justify-content-center text-center d-flex align-items-center row mt-n1">
            <Row className=" card-text">
              <Col>
                Aspect Ratio <br />
                {billboard.aspectRatio}
              </Col>
              <Col>Rate <br/> {billboard.rate}$ per hour</Col>
            </Row>
            <Row className=" card-text">
              street address : {billboard.address.street}st,{billboard.address.city} city
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row className="px-2 my-2">
        <MyMap
          mapConfig={mapConfig}
          setMapConfig={setMapConfig}
          billboards={[billboard]}
          location="modal"
        />
      </Row>
      {!error && !success && (
        <Row>
          <Col className="offset-2 justify-content-center mt-3 px-3" xs={8}>
            <MyButton
              className="submit ms-auto me-auto wide"
              clickHandler={() => {
                handleAccept();
                props.show(false)
              }}
            >
              Accept
            </MyButton>
            <MyButton
              className="submit-danger ms-auto me-auto mt-3 wide"
              clickHandler={() => {
                handleReject();
                props.show(false)
              }}
            >
              Reject
            </MyButton>
          </Col>
        </Row>
      )} */}
    </>
  );
};

export default BillboardDescription;
