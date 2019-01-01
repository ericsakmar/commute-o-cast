import fetch from 'node-fetch';

const key = process.env.DARKSKY_KEY;

exports.handler = async (event, context) => {
  const {lat, lon} = event.queryStringParameters;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  const hourly = await getForecast(lat, lon);
  const {data} = hourly;
  const forecast = [
    {
      one: 'one',
      am: data.find(f => f.time === getTime(year, month, day, 8)),
      pm: data.find(f => f.time === getTime(year, month, day, 17)),
    },
    {
      two: 'two',
      am: data.find(f => f.time === getTime(year, month, day + 1, 8)),
      pm: data.find(f => f.time === getTime(year, month, day + 1, 17)),
    },
    {
      three: 'three',
      am: data.find(f => f.time === getTime(year, month, day + 2, 8)),
      pm: data.find(f => f.time === getTime(year, month, day + 2, 17)),
    },
  ];

  return {statusCode: 200, body: JSON.stringify(forecast)};
};

function getTime(year, month, day, hours) {
  const date = new Date(year, month, day, hours, 0, 0, 0);
  const time = date.getTime() / 1000;
  return time;
}

async function getForecast(lat, lon) {
  const res = await fetch(
    `https://api.darksky.net/forecast/${key}/${lat},${lon}`,
  );
  const json = await res.json();
  return json.hourly;
}
