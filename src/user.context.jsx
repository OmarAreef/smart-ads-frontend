import React, { useState, createContext, useContext } from "react";
import Cookies from "js-cookie";
const userContext = createContext();

const UserContextProvider = (props) => {
  const [role, setRole] = useState(null);
  const [billboardImage, setBillboardImage] = useState(null);
  const [campaignImage, setCampaignImage] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const [price, setPrice] = useState(null);

  const login = () => {
    const myCookies = Cookies.get();
    setRole(myCookies.role);
  };

  const logout = () => {
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
  };

  const addPrice = (data) => {
    setPrice(data);
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
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};
const useUserContext = () => useContext(userContext);
export { UserContextProvider, useUserContext };
