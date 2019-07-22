'use strict';
const getGeoPosition = () => {
  const options = {
    maximumAge: 180000,
  };
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};
export default getGeoPosition;