import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  WithGoogleMapProps,
  WithScriptjsProps,
} from "react-google-maps";
import { CoordinatesType } from "../models/Contractors";

type AppMapPropsType = {
  handleSelectCoords: (latLng: google.maps.LatLng | null) => void;
  marker: CoordinatesType | null;
};

const AppMap: React.ComponentClass<
  WithGoogleMapProps & WithScriptjsProps & AppMapPropsType
> = withScriptjs(
  withGoogleMap(({ handleSelectCoords, marker }) => {
    const onMapClick = (
      e: google.maps.MouseEvent | google.maps.IconMouseEvent
    ) => {
      handleSelectCoords(e.latLng);
    };

    return (
      <GoogleMap
        defaultZoom={
          marker
            ? marker.coordinatesLatitude.length > 0 &&
              !isNaN(Number(marker.coordinatesLatitude))
              ? 12
              : 7
            : 7
        }
        defaultCenter={
          marker
            ? marker.coordinatesLatitude.length > 0 &&
              !isNaN(Number(marker.coordinatesLatitude))
              ? {
                  lat: Number(marker.coordinatesLatitude),
                  lng: Number(marker.coordinatesLongitude),
                }
              : { lat: 51.2146889644867, lng: 68.80153486533352 }
            : { lat: 51.2146889644867, lng: 68.80153486533352 }
        }
        onClick={onMapClick}
      >
        {marker && (
          <Marker
            position={{
              lat: Number(marker.coordinatesLatitude),
              lng: Number(marker.coordinatesLongitude),
            }}
          />
        )}
      </GoogleMap>
    );
  })
);

export default AppMap;
