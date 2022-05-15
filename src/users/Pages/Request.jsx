import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { useUserContext } from "../../user.context";
import MyCard from "../../billboards/components/MyBillboard";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const Request = () => {
  const [userBillboards, setBillboards] = useState(null);
  const userContext = useUserContext();
  useEffect(() => {
    console.log(userContext.role);
    axios
      .post("http://localhost:8000/user/requests", {}, config)
      .then((response) => {
        console.log(response.data);
        setBillboards(response.data.billboards);
      });
  }, []);
  return (
    <>
      <Header className="billboard_navbar mb-0 py-2"></Header>
      <Row className=" px-2 mt-3 mx-0 h-100  justify-content-start text-center">
        <h1 className="display-3 text-center fs-1">
          Here you can find your billboards and know their status whether active
          or pending. <br />
          You will also find any active campaigns that you have made.
        </h1>
      </Row>
      <Row className=" px-2 mt-5 mx-5 h-100  justify-content-start text-center">
        <h1 className="display-4 text-start fs-3">Your Billboards</h1>
        {userBillboards &&
          userBillboards.map((elem) => {
            console.log(elem);
            return (
              <Col sm={3} xs={6}>
                {elem.active && (
                  <h1 className="display-3 text-center text-success fs-4">
                    Active
                  </h1>
                )}
                {!elem.active && (
                  <h1 className="display-3 text-center text-danger fs-4">
                    Pending
                  </h1>
                )}
                <MyCard
                  className="billboard-card w-75 ms-auto me-auto"
                  billboard={elem}
                  showInfo={true}
                />
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default Request;
