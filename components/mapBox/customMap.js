import React, {useEffect} from "react";

import ReactMapboxGl, {GeoJSONLayer, Marker} from "react-mapbox-gl";

import config from '../../src/config.json';
import {mapService} from "../../services/map.service";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import isEqual from "lodash/isEqual";

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAP_BOX_KEY,
});


const CustomMap = (value) => {
  const [showStartIcon, setShowStartIcon] = React.useState(false);
  const [showEndIcon, setShowEndIcon] = React.useState(false);
  const [showGeoJSON, setShowGeoJSON] = React.useState(false);
  const [geoJSON, setGeoJSON] = React.useState(null);
  const [startPoint, setStartPoint] = React.useState(null);
  const [endPoint, setEndPoint] = React.useState(null);
  const [inputProps, setInputProps] = React.useState({});

  useEffect(() => {

    let tmpBounds = [];
    let tmpStartPoint = null;
    let tmpEndPoint = null;

    if (value.startPoint && value.startPoint.longitude) {
      tmpStartPoint = [value.startPoint.longitude, value.startPoint.latitude];
      if (!isEqual(tmpStartPoint, startPoint)) {
        setStartPoint(tmpStartPoint);
      }

      tmpBounds.push(tmpStartPoint);
      setShowStartIcon(true);
    } else {
      setShowStartIcon(false);
    }
    if (value.endPoint && value.endPoint.longitude) {
      tmpEndPoint = [value.endPoint.longitude, value.endPoint.latitude];
      if (!isEqual(tmpEndPoint, endPoint)) {
        setEndPoint(tmpEndPoint);
      }
      tmpBounds.push(tmpEndPoint);
      setShowEndIcon(true);
    } else {
      setShowEndIcon(false);
    }

    let tmpInputProps = {};
    tmpInputProps.fitBoundsOptions = {padding: 50};
    if (tmpBounds.length === 1) {
      tmpInputProps.fitBounds = [
        [tmpBounds[0][0] + config.map.mapSingleBoundAdd, tmpBounds[0][1] + config.map.mapSingleBoundAdd],
        [tmpBounds[0][0] - config.map.mapSingleBoundAdd, tmpBounds[0][1] - config.map.mapSingleBoundAdd]
      ];
    } else if (tmpBounds.length >= 2) {
      tmpInputProps.fitBounds = tmpBounds;
    } else {
      tmpInputProps.fitBounds = [
        [config.map.mapDefaultCenter.long + config.map.defaultBoundAdd, config.map.mapDefaultCenter.lat + config.map.defaultBoundAdd],
        [config.map.mapDefaultCenter.long - config.map.defaultBoundAdd, config.map.mapDefaultCenter.lat - config.map.defaultBoundAdd]
      ];
    }

    if (value.startPoint && value.endPoint) {
      mapService.getRoutePath(
        value.startPoint.longitude, value.startPoint.latitude,
        value.endPoint.longitude, value.endPoint.latitude
      )
        .then(data => {
          if (data && data.routes) {
            const maxLong = maxBy(data.routes[0].geometry.coordinates, function (o) {
              return Math.abs(o[0]);
            })[0];
            const maxLat = maxBy(data.routes[0].geometry.coordinates, function (o) {
              return Math.abs(o[1]);
            })[1];
            const minLong = minBy(data.routes[0].geometry.coordinates, function (o) {
              return Math.abs(o[0]);
            })[0];
            const minLat = minBy(data.routes[0].geometry.coordinates, function (o) {
              return Math.abs(o[1]);
            })[1];

            tmpInputProps.fitBounds = [
              [maxLong, maxLat],
              [minLong, minLat],
            ];

            setGeoJSON({
              type: "FeatureCollection",
              features: data.routes
            });
            setShowGeoJSON(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setShowGeoJSON(false);
      setGeoJSON(null);
    }
    if (!isEqual(tmpInputProps, inputProps)) {
      setInputProps(tmpInputProps);
    }
  }, [value]);


  const lineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  };
  const linePaint = {
    'line-color': '#4790E5',
    'line-width': 3
  };


  // console.log('start', startPoint);
  // console.log('end', endPoint);
  // console.log('tmpInputProps', inputProps);
  // console.log('geoJson', geoJSON);
  // console.log(geoJSON);

  return (
    <div className="map-box">
      <Map
        style="mapbox://styles/mapbox/light-v10"
        containerStyle={{
          height: "250px",
          width: "100%",
        }}{...inputProps}
      >
        {/* start location */}
        {showStartIcon ? (
          <Marker
            coordinates={startPoint}
            id={"ss"}
            anchor="center"
          >
            <img
              src="/map-start.svg"
              alt="search start"
              className="icons"
            />
          </Marker>
        ) : null}

        {showEndIcon ? (
          <Marker
            coordinates={endPoint}
            id={"22"}
            anchor="center"
          >
            <img
              src="/map-end.svg"
              alt="search end"
              className="icons"
            />
          </Marker>
        ) : null}
        {/* start Route */}
        {showGeoJSON ? (<GeoJSONLayer
          data={geoJSON}
          lineLayout={lineLayout}
          linePaint={linePaint}
        />
        ) : null}
      </Map>
    </div>
  );
};
export default CustomMap;
