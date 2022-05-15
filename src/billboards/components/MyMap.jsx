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
  return (
    <Map
      id={`mapContainer-${location}`}
      initialViewState={{ ...mapConfig, bearing: 0, pitch: 0 }}
      dragePan={true}
      {...mapConfig}
      onMove={(evt) => setMapConfig(evt.viewState)} // onLoad={() => setLoading(false)}
      // style={{ width: 100 , height: 100 }}
      mapStyle="mapbox://styles/omar-aref/cl2rpkoaz000015o34jtslnk9"
      mapboxAccessToken="pk.eyJ1Ijoib21hci1hcmVmIiwiYSI6ImNsMnJvaTl0NzMwamczZ283ZXZ4MGZqZDgifQ.w3gXutTfdhM0IG6TeUz-LQ"
      onClick={clickHandler ? (e) => clickHandler(e) : null}
    >
      <GeolocateControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <NavigationControl position="bottom-right" />
      <ScaleControl />
      {billboards &&
        billboards.map((item, index) => {
          return (
            <Marker
              key={`marker-${index}`}
              longitude={item.Coordinates.longitude}
              latitude={item.Coordinates.latitude}
              anchor="bottom"
            >
              <Pin
                clickHandler={pinClickHandler}
                setSelectedBillboard={setSelectedBillboard}
                billboard={item}
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
