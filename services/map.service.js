import Axios from "axios";
import pMemoize from "p-memoize";

const mapBoxUrl = 'https://api.mapbox.com';
const country = 'gb';
const results = 5;

function getPlace(
  search_text
) {
  const url = `${mapBoxUrl}/geocoding/v5/mapbox.places/${search_text}.json?` +
    `country=${country}&` +
    `autocomplete=true&` +
    `routing=true&` +
    `limit=${results}&` +
    `access_token=${process.env.NEXT_PUBLIC_MAP_BOX_KEY}&`;

  return Axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getRoutePath(
  lat1,
  long1,
  lat2,
  long2,
) {
  const url = `${mapBoxUrl}/directions/v5/mapbox/` +
    `driving/${lat1},${long1};${lat2},${long2}` +
    `?` +
    `geometries=geojson&` +
    `steps=false&` +
    `access_token=${process.env.NEXT_PUBLIC_MAP_BOX_KEY}`;
  return Axios.get(url)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const mapService = {
  // getRoutePath: getRoutePath,
  getRoutePath: pMemoize(getRoutePath, {
    cacheKey: arguments_ => JSON.stringify(arguments_),
  }),
  // getPlace: getPlace,
  getPlace: pMemoize(getPlace, {
    cacheKey: arguments_ => JSON.stringify(arguments_),
  }),
};
