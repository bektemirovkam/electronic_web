import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  WithGoogleMapProps,
  WithScriptjsProps,
} from "react-google-maps";

const AppMap: React.ComponentClass<
  WithGoogleMapProps & WithScriptjsProps,
  any
> = withScriptjs(
  withGoogleMap(() => {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      />
    );
  })
);

export default AppMap;
