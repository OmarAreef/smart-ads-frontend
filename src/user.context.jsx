import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
const userContext = createContext();
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const UserContextProvider = (props) => {
  const [role, setRole] = useState(null);
  const [billboardImage, setBillboardImage] = useState(null);
  const [campaignImage, setCampaignImage] = useState(null);
  const [campaignData, setCampaignData] = useState({});
  const [price, setPrice] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [globalFormError, setGlobalFormError] = useState(null);
  const [globalFormSuccess, setGlobalFormSuccess] = useState(null);
  const navigate = useNavigate();

  const login = () => {
    const myCookies = Cookies.get();
    setRole(myCookies.role);
    if (myCookies.role !== "Admin") {
      navigate("/billboards");
    }
    if (myCookies.role === "Admin") {
      navigate("/admin");
    }
  };

  const logout = () => {
    navigate("/");
    setRole(null);
  };

  const addImage = (path, type) => {
    if (type === "billboard") {
      setBillboardImage(path);
    }
    if (type === "campaign") {
      setCampaignImage(path);
    }
  };

  const addCampaign = (data) => {
    setCampaignData(data);
    if (data.billboards || data.state) {
      console.log(data);
      getPayment(data);
      return
    }
    setDisabled(true)
  };

  const addPrice = (data) => {
    setPrice(data);
    if (data === 0) {
      setDisabled(true);
    }
  };
  const resetCampaign = () => {
    setPrice(0);
    setGlobalFormError(null);
    setCampaignData({});
    setCampaignImage(null);
  };

  const getPayment = (data) => {
    if (data.state && data.state.length === 0) {
      setGlobalFormError("No state is selected choose at least one state");
      addPrice(0);
      return;
    }
    if (!data.startDate) {
      setGlobalFormError(
        "Fill the second section with the required information"
      );
      addPrice(0);
      return;
    }
    if (data.billboards && data.billboards.length === 0) {
      setGlobalFormError("Choose atleast one billboard");
      addPrice(0);
      return;
    }

    axios
      .post("http://localhost:8000/display/payement", data, config)
      .then((response) => {
        console.log(response);

        addPrice(response.data.price);
        setGlobalFormError(null);
        setDisabled(false);
      })
      .catch((error) => {
        setGlobalFormError(error.response.data.message);
        setDisabled(true);
        setPrice(0);
        console.log(error.response.data);
      });
  };

  const createCampaign = (setLoading) => {
    if (!campaignImage) {
      setGlobalFormError("No Image is selected, please specify an image");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("billboards", campaignData.billboards);
    formData.append("startTime", campaignData.startTime);
    formData.append("endTime", campaignData.endTime);
    formData.append("startDate", campaignData.startDate);
    formData.append("endDate", campaignData.endDate);
    formData.append("frequency", campaignData.frequency);
    formData.append("duration", campaignData.duration);
    formData.append("file", campaignImage);
    console.log(userContext.campaignData);
    axios
      .post("http://localhost:8000/display/", formData, config)
      .then((response) => {
        setGlobalFormSuccess(response.data.message);
        setGlobalFormError(null)
        setDisabled(true);
        setLoading(false);
      })
      .catch((error) => {
        // setSuccess(null);

        setGlobalFormError(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <userContext.Provider
      value={{
        login,
        logout,
        role,
        addImage,
        campaignImage,
        billboardImage,
        addCampaign,
        campaignData,
        price,
        addPrice,
        getPayment,
        globalFormError,
        setGlobalFormError,
        createCampaign,
        resetCampaign,
        disabled,
        globalFormSuccess

      }}
    >
      {props.children}
    </userContext.Provider>
  );
};
const useUserContext = () => useContext(userContext);
export { UserContextProvider, useUserContext };
