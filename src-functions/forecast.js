import fetch from 'node-fetch';
import {addDays, getDay, setHours} from 'date-fns';

const key = process.env.DARKSKY_KEY;

exports.handler = async (event, context) => {
  const {am, lat, lon, pm} = event.queryStringParameters;

  let date = new Date();
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0);

  if (date.getHours() > pm) {
    date = addDays(date, 1);
  }

  let forecast = [];

  while (forecast.length < 5) {
    if (getDay(date) === 0) {
      date = addDays(date, 1);
    } else if (getDay(date) === 6) {
      date = addDays(date, 2);
    }

    const day = await getForecast(
      lat,
      lon,
      toTime(setHours(date, am)),
      toTime(setHours(date, pm)),
    );

    forecast.push(day);

    date = addDays(date, 1);
  }

  return {statusCode: 200, body: JSON.stringify(forecast)};
};

function toTime(date) {
  return date.getTime() / 1000;
}

async function getForecast(lat, lon, am, pm) {
  const res = await fetch(
    `https://api.darksky.net/forecast/${key}/${lat},${lon},${am}`,
  );
  const json = await res.json();
  const {data} = json.hourly;
  return {
    am: data.find(f => f.time === am),
    pm: data.find(f => f.time === pm),
  };
}
