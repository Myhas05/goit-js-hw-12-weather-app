import './styles.css';
import PNotify from '../node_modules/pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
import getGeoPosition from './js/getGeoPosition';
import fetchWeather from './js/fetchWeather';
PNotify.defaults.styling = 'material';

const refs = {
  form: document.querySelector('#search-form'),
  location: document.querySelector('[data-field="location"]'),
  temperature: document.querySelector('[data-field="temp"]'),
  humidity: document.querySelector('[data-field="humidity"]'),
  wind: document.querySelector('[data-field="wind"]'),
  conditions: document.querySelector('[data-field="conditions"]'),
  icon: document.querySelector('.icon'),
};

getGeoPosition()
  .then(position => {
    const coords = position.coords;
    return fetchWeather(`${coords.latitude},${coords.longitude}`);
  })
  .then(responce => markupHtml(responce))
  .catch(() => {
    PNotify.error({
      text:
        'Нет права доступа к геопозиции, используйте поиск по имени города.',
    });
  });

refs.form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.city;
  const query = input.value;
  fetchWeather(query)
    .then(responce => markupHtml(responce))
    .catch(error => console.error(error));
  input.value = '';
}

function markupHtml(object) {
  refs.icon.setAttribute('alt', object.current.condition.text);
  refs.icon.setAttribute('src', `https:${object.current.condition.icon}`);
  addContent(refs.location, object.location.name);
  addContent(refs.temperature, `${object.current.temp_c}`);
  addContent(refs.humidity, `${object.current.humidity} %`);
  addContent(refs.wind, `${object.current.wind_kph} kph`);
  addContent(refs.conditions, object.current.condition.text);
  document.querySelector('#weather').classList.remove('is-hidden');
}

function addContent(ref, content) {
  ref.textContent = content;
}
