import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import { Row, Col, Container, Table } from "react-bootstrap";
import axios from "axios";
import { useUserContext } from "../../user.context";
import MyCard from "../../billboards/components/MyBillboard";
import "./request.css";
import CampaignDescription from "../components/CampaignDescription";
import LoadingSpinner from './../../shared/LoadingSpinner';
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const Request = () => {
  const [userActiveCampaigns, setActiveCampaigns] = useState(null);
  const [userNotActiveCampaigns, setNotActiveCampaigns] = useState(null);
  const [loading, setLoading] = useState(false);
  const userContext = useUserContext();
  useEffect(() => {
    setLoading(true);
    console.log(userContext.role);
    axios
      .post("http://localhost:8000/user/requests", {}, config)
      .then((response) => {
        console.log(response.data.nonActive, response.data.activeCampaigns);
        setActiveCampaigns(response.data.activeCampaigns);
        setNotActiveCampaigns(response.data.nonActive);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading && <LoadingSpinner asOverlay />}
      <Header className="billboard_navbar mb-0 py-2"></Header>
      <Row className=" px-2 mt-3 mx-0 h-100  justify-content-start text-center">
        <h1 className="display-3 text-center fs-1">
          Here you can find your campaigns and know their status whether active
          or pending. <br />
          
        </h1>
      </Row>
      <Row className=" px-2 mt-5 mx-5 h-100  justify-content-start text-center  align-items-center">
        <h1 className="display-4 text-start fs-3">
          Your <span className="text-danger fw-bolder">Pending</span> Campaigns:
        </h1>
        <div>
          <Table bordered hover responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start time</th>
                <th>End Time</th>
                <th>Frequency (per hour)</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Number of Billboards</th>
                <th>AD</th>
              </tr>
            </thead>
            <tbody>
              {userNotActiveCampaigns &&
                userNotActiveCampaigns.map((elem, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <CampaignDescription
                        className="billboard-card ms-auto me-auto"
                        campaign={elem}
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
          Your <span className="text-success fw-bolder">Active</span> Campaigns:
        </h1>
        <div>
          <Table bordered hover responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start time</th>
                <th>End Time</th>
                <th>Frequency (per hour)</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Number of Billboards</th>
                <th>AD</th>
              </tr>
            </thead>
            <tbody>
              {userActiveCampaigns &&
                userActiveCampaigns.map((elem, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <CampaignDescription
                        className="billboard-card ms-auto me-auto"
                        campaign={elem}
                        key={`active-${index}`}
                      ></CampaignDescription>
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

export default Request;
