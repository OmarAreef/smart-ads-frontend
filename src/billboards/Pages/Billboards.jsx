import MyMap from "../components/MyMap";
import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../shared/Header";
import { useUserContext } from "../../user.context";
import MyButton from "../../shared/Button";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import MyCard from "../components/MyBillboard";
import "./Billboards.css";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Alert } from "react-bootstrap";
import MyModal from "../../shared/MyModal.jsx";
import {
  MapForm,
  ImageForm,
  BillboardForm,
  CampaignForm,
  ChoosingBillboard,
  Payment
} from "../../forms/Forms";
import { Country, State, City } from "country-state-city";

const Billboards = () => {
  const [billboards, setBillboards] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState(null);
  const [allCities, setAllCities] = useState(null);
  const [selectedBillboard, setSelectedBillboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapConfig, setMapConfig] = useState({
    latitude: 31.0444,
    longitude: 31.2357,
    zoom: 2.5,
  });
  const userContext = useUserContext();
  const [showBillboard, setShowBillboard] = useState(false);
  const [showCampaign, setShowCampaign] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/billboard/")
      .then((response) => {
        console.log(response.data);
        setBillboards(response.data);
      })
      .catch((error) => setError(error.response.message));
    let countriesList = Country.getAllCountries();
    let myCountriesList = countriesList.map((country) => {
      return { name: country.name, code: country.isoCode };
    });

    setAllCountries(myCountriesList);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const handleMapFormChange = (e) => {
    setLoading(true);
    console.log(e.target.name);
    if (e.target.name === "Country") {
      let myCountry = Country.getCountryByCode(e.target.value);
      setMapConfig({
        latitude: myCountry.latitude,
        longitude: myCountry.longitude,
        zoom: 4,
      });
      console.log(mapConfig);
      let statesList = State.getStatesOfCountry(e.target.value);
      let myStatesList = statesList.map((state) => {
        return {
          name: state.name,
          code: `${state.countryCode} ${state.isoCode}`,
        };
      });
      console.log(myStatesList);
      setAllStates(myStatesList);
    }

    if (e.target.name === "State") {
      let myString = e.target.value.split(" ");
      let myState = State.getStateByCodeAndCountry(myString[1], myString[0]);
      setMapConfig({
        latitude: myState.latitude,
        longitude: myState.longitude,
        zoom: 7.5,
      });
      console.log(myString);
      let citiesList = City.getCitiesOfState(myString[0], myString[1]);
      setAllCities(citiesList);
    }
    if (e.target.name === "Cities") {
      const city = JSON.parse(e.target.value);
      setMapConfig({
        latitude: city.latitude,
        longitude: city.longitude,
        zoom: 11,
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Header className="billboard_navbar mb-0 py-2"></Header>

      <Row className=" px-0 mx-0 h-100 justify-content-md-start justify-content-start text-center">
        <MyModal
          show={showBillboard}
          handleClose={() => setShowBillboard(false)}
          title={"New Billboard"}
          size="lg"
        >
          {!userContext.billboardImage && (
            <ImageForm type="billboard"></ImageForm>
          )}
          {userContext.billboardImage && <BillboardForm />}
        </MyModal>
        <MyModal
          show={showCampaign}
          handleClose={() => setShowCampaign(false)}
          title={"New Campaign"}
          size="lg"
        >
          {!userContext.campaignImage && (
            <ImageForm type="campaign"></ImageForm>
          )}
          {userContext.campaignImage && !userContext.campaignData && (
            <CampaignForm />
          )}
          {userContext.campaignData && !userContext.price && <ChoosingBillboard />}
          {userContext.price && <Payment></Payment>}
        </MyModal>
        {error && <Alert variant={"danger"}>{error}</Alert>}
        <Col
          className="px-0 pt-4 justify-content-center text-center billboard_background"
          sm={10}
          md={5}
        >
          <Row className="justify-content-center mb-4">
            {userContext.role === "Client" && (
              <>
                <Col xs={5}>
                  <MyButton
                    className="billboard-button py-3  px-3"
                    clickHandler={() => setShowBillboard(true)}
                  >
                    Add your billboard
                  </MyButton>
                </Col>
                <Col xs={5}>
                  <MyButton
                    className="billboard-button py-3 px-3"
                    clickHandler={() => setShowCampaign(true)}
                  >
                    Create campaign
                  </MyButton>
                </Col>
              </>
            )}
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col xs={12}>
              <h1 className="display-5 title text-center">
                Here you can filter, find, know more about the billboards
                availabe on the platform
              </h1>
            </Col>
          </Row>

          {loading && <LoadingSpinner asOverlay />}
          <Row className="justify-content-center text-center w-75 ms-auto me-auto">
            <MapForm
              Countries={allCountries}
              States={allStates}
              Cities={allCities}
              handleChange={handleMapFormChange}
            />
          </Row>
          <Row className="mt-4 mb-2">
            {selectedBillboard && (
              <MyCard
                className="billboard-card w-75 ms-auto me-auto"
                billboard={selectedBillboard}
              />
            )}
          </Row>
        </Col>
        <Col className="px-0 billboard_background " sm={10} md={7}>
          <MyMap
            mapConfig={mapConfig}
            setMapConfig={setMapConfig}
            billboards={billboards}
            setSelectedBillboard={setSelectedBillboard}
            selectedBillboard={selectedBillboard}
          />
        </Col>
      </Row>
    </>
  );
};

export default Billboards;
