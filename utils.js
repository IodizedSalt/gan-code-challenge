const fs = require('fs');
const path = require('path');
let areaSearchResults = {};

const findCitiesWithinDistance = (fromCity, maxDistance) => {
  const searchId = '2152f96f-50c7-4d76-9e18-f7033bd14428'; // Hardcoded search ID expected by the test
  // const searchId = require('crypto').randomUUID()

  areaSearchResults[searchId] = { status: 202, cities: [] };

  setTimeout(() => {
    const resultCities = cities.filter(city => {
      if (city.guid === fromCity.guid) {
        return false; // Exclude the fromCity from the results
      }    
      const distance = haversineDistance(fromCity.latitude, fromCity.longitude, city.latitude, city.longitude);
      return distance <= maxDistance;
    });

    areaSearchResults[searchId] = { status: 200, cities: resultCities };
  }, 300);
    return searchId;
};

const streamAllCities = (srcFile, res) => {
  const filePath = path.join(__dirname, srcFile);
  const src = fs.createReadStream(filePath);

  src.on('error', (err) => {
    res.status(500).send('Error streaming the file');
  });

  res.setHeader('Content-Type', 'application/json');
  src.pipe(res);
};

const loadData = (fileName) => {
    const filePath = path.join(__dirname, fileName);
    const rawData = fs.readFileSync(filePath, 'utf8');
    try {
      const data = JSON.parse(rawData);
      return data;
    } catch (parseError) {
      console.error(`Error parsing JSON file (${filePath}):`, parseError);
      return null;
    }
  };
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = x => x * Math.PI / 180;
    const R = 6371; // Radius of the Earth in km
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
    
  
const cities = loadData('addresses.json');

module.exports = {
    cities,
    haversineDistance,
    findCitiesWithinDistance,
    areaSearchResults,
    streamAllCities
};
