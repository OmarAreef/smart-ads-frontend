import React, { useState, useEffect } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "../components/pin";
import MyCard from "../components/MyBillboard";
import "./MyMap.css";
function MyMap({
  mapConfig,
  setMapConfig,
  billboards,
  setSelectedBillboard,
  selectedBillboard,
  clickHandler,
  location,
  selectedLocation,
  pinClickHandler,
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Map
      id={`mapContainer-${location}`}
      initialViewState={{ ...mapConfig, bearing: 0, pitch: 0 }}
      dragePan={true}
      {...mapConfig}
      onMove={(evt) => setMapConfig(evt.viewState)} // onLoad={() => setLoading(false)}
      // style={{ width: 100 , height: 100 }}
      //
      mapStyle="mapbox://styles/omar-aref/cl2rpkoaz000015o34jtslnk9"
      mapboxAccessToken="pk.eyJ1Ijoib21hci1hcmVmIiwiYSI6ImNsMnJvaTl0NzMwamczZ283ZXZ4MGZqZDgifQ.w3gXutTfdhM0IG6TeUz-LQ"
      onClick={clickHandler ? (e) => clickHandler(e) : null}
    >
      {!(location === "table") && (
        <>
          <GeolocateControl position="bottom-right" />
          <FullscreenControl position="bottom-right" />
          <NavigationControl position="bottom-right" />

          <ScaleControl />
        </>
      )}
      {showPopup && selectedBillboard && (
        <Popup
          longitude={selectedBillboard.Coordinates.longitude}
          latitude={selectedBillboard.Coordinates.latitude}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
        >
          <MyCard className="popup " billboard={selectedBillboard} />
        </Popup>
      )}
      {billboards &&
        billboards.map((item, index) => {
          return (
            <Marker
              key={`marker-${index}`}
              longitude={item.Coordinates.longitude}
              latitude={item.Coordinates.latitude}
              anchor="bottom"
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                // setShowPopup(true)
              }}
            >
              <Pin
                clickHandler={pinClickHandler}
                setSelectedBillboard={setSelectedBillboard}
                setShowPopup={setShowPopup}
                billboard={item}
                popup={showPopup}
              />
            </Marker>
          );
        })}
      {selectedLocation && (
        <Marker
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
          }}
        >
          <Pin />
        </Marker>
      )}
    </Map>
  );
}

export default MyMap;
