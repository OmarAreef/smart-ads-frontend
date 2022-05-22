import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import { Row, Col, Container, Table } from "react-bootstrap";
import axios from "axios";
import { useUserContext } from "../../user.context";
import MyCard from "../../billboards/components/MyBillboard";
import "./request.css";
import BillboardDescription from "../components/BillboardDescription";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const Agency = () => {
  const [userActiveBillboards, setActiveBillboards] = useState(null);
  const [userNotActiveBillboards, setNotActiveBillboards] = useState(null);
  const userContext = useUserContext();
  useEffect(() => {
    console.log(userContext.role);
    axios
      .post("http://localhost:8000/agency/requests", {}, config)
      .then((response) => {
        console.log(response.data.nonActive, response.data.activeCampaigns);
        setActiveBillboards(response.data.activeBillboards);
        setNotActiveBillboards(response.data.pendingBillboards);
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
      <Row className=" px-2 mt-5 mx-5 h-100  justify-content-start text-center  align-items-center">
        <h1 className="display-4 text-start fs-3">
          Your <span className="text-danger fw-bolder">Pending</span>{" "}
          Billboards:
        </h1>
        <div>
          <Table bordered hover responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Aspect ratio</th>
                <th>Rate (per hour)</th>
                <th>Street address</th>
                <th>City</th>
                <th>Country</th>
                <th>Real image</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {userNotActiveBillboards &&
                userNotActiveBillboards.map((elem, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <BillboardDescription
                        className="billboard-card ms-auto me-auto"
                        billboard={elem}
                        key={`nonactive-${index}`}
                      />
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Row>
      <Row className=" px-2 mt-5 mx-5 h-100  justify-content-start text-center">
        <h1 className="display-4 text-start fs-3">
          Your <span className="text-success fw-bolder">Active</span>{" "}
          Billboards:
        </h1>
        <div>
          <Table bordered hover responsive="md" size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Aspect ratio</th>
                <th>Rate (per hour)</th>
                <th>Street address</th>
                <th>City</th>
                <th>Country</th>
                <th>Real image</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {userActiveBillboards &&
                userActiveBillboards.map((elem, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <BillboardDescription
                        className="billboard-card ms-auto me-auto"
                        billboard={elem}
                        key={`active-${index}`}
                      ></BillboardDescription>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Row>
    </>
  );
};

export default Agency;
