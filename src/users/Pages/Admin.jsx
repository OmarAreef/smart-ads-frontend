import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";

import { Row, Table, Alert } from "react-bootstrap";
import axios from "axios";
import { useUserContext } from "../../user.context";
import BillboardDescription from "../components/BillboardDescription";
import CampaignDescription from "../components/CampaignDescription";
import LoadingSpinner from './../../shared/LoadingSpinner';
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const Admin = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [userBillboards, setBillboards] = useState(null);
  const [userCampaigns, setCampaigns] = useState(null);
  const [loading, setLoading] = useState(null);
  const userContext = useUserContext();
  const handleReject = (id, type) => {
    axios
      .post(
        `http://localhost:8000/admin/reject${type}`,
        {
          id: id,
        },
        config
      )
      .then((response) => {
        console.log(response);
        setSuccess(response.data.message);
        getBillboards();
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  const handleAccept = (id, type) => {
    axios
      .post(
        `http://localhost:8000/admin/accept${type}`,
        {
          id: id,
        },
        config
      )
      .then((response) => {
        setSuccess(response.data.message);
        getBillboards();
      })
      .catch((error) => setError(error.response.data.message));
  };
  const getBillboards = () => {
    
    axios
      .post("http://localhost:8000/admin/requests", {}, config)
      .then((response) => {
        console.log(response.data);
        setBillboards(response.data.billboards);
        setCampaigns(response.data.campaigns);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getBillboards();
    console.log(userContext.role);
  }, []);

  return (
    <>
      {loading && <LoadingSpinner asOverlay />}
      <Header className="billboard_navbar mb-0 py-2"></Header>

      <Row className=" px-2 mt-3 mx-0 h-100  justify-content-start text-center">
        <h1 className="display-3 text-center fs-1">
          Here you can find the Requests of the billboards published by agencies
          and campaigns published by clients. <br />
          You can accept the ones you find appropriate
        </h1>
      </Row>

      {error && !success && <Alert variant={"danger"}>{error}</Alert>}
      {success && !error && <Alert variant={"success"}>{success}</Alert>}
      <Row className=" px-2 mt-5 mx-5 h-100  justify-content-start text-center">
        <h1 className="display-4 text-start fs-3 mb-2">Billboard requests:</h1>
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
              {userBillboards &&
                userBillboards.map((elem, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <BillboardDescription
                        className="billboard-card ms-auto me-auto"
                        billboard={elem}
                        key={`nonactive-${index}`}
                        show={true}
                        handleAccept={handleAccept}
                        handleReject={handleReject}
                      />
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Row>
      <Row className=" px-2 mt-5 mx-5 h-100  justify-content-start text-center">
        <h1 className="display-4 text-start fs-3  mb-2">Campaign requests:</h1>
        <div>
          <Table bordered hover responsive="md" size="sm">
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
              {userCampaigns &&
                userCampaigns.map((elem, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <CampaignDescription
                        className="billboard-card ms-auto me-auto"
                        campaign={elem}
                        key={`nonactive-${index}`}
                        show={true}
                        handleAccept={handleAccept}
                        handleReject={handleReject}
                      />
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

export default Admin;
