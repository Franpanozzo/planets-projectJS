const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  const stellarFlux = planet['koi_insol']
  return planet['koi_disposition'] === 'CONFIRMED'
  && stellarFlux > 0.36 && stellarFlux < 1.11
  && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true //This will return each row in our csv as a javascript object
  }))
  .on('data', data => {
    if(isHabitablePlanet(data)) habitablePlanets.push(data);
  })
  .on('error', err => {
    console.log(err)
  })
  .on('end', () => {
    console.log(habitablePlanets.map(planet => planet['kepler_name']))
    console.log(`${habitablePlanets.length} habitable planets found`);
  });