'use strict';
const fetchWeather = query => {
  const options = {
    baseUrl: 'https://api.apixu.com/v1/current.json',
    apiKey: 'f7fd0010fef04f29b03124816191907',
  };

  const requestParams = `?key=${options.apiKey}&q=${query}`;

  return fetch(options.baseUrl + requestParams).then(responce =>
    responce.json(),
  );
};

export default fetchWeather;
