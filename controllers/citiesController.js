const { cities, haversineDistance, findCitiesWithinDistance, areaSearchResults, streamAllCities } = require('../utils');

const getCitiesByTag = (req, res) => {
  const { tag, isActive } = req.query;
  const filteredCities = cities.filter(city => 
	city.tags.includes(tag) && String(city.isActive) === isActive
  );
  res.json({ cities: filteredCities });
};

const getDistance = (req, res) => {
	const { from, to } = req.query;
	const fromCity = cities.find(city => city.guid === from);
	const toCity = cities.find(city => city.guid === to);
	
	if (!fromCity && !toCity) {
		return res.status(404).send('Both origin and destination cities are missing');
	} else if (!fromCity) {
		return res.status(404).send('origin city is missing');
	} else if (!toCity) {
		return res.status(404).send('destination city is missing');
	}
	  
  
	const distance = haversineDistance(fromCity.latitude, fromCity.longitude, toCity.latitude, toCity.longitude);
	res.json({
		from: fromCity,
		to: toCity,
		unit: 'km',
		distance: parseFloat(distance.toFixed(2))
	});
};

const getArea = (req, res) => {
	const { from, distance } = req.query;
	const fromCity = cities.find(city => city.guid === from);
  
	if (!fromCity) {
	  return res.status(404).send('City not found');
	}
  
	const searchId = findCitiesWithinDistance(fromCity, parseFloat(distance));
	res.status(202).json({ resultsUrl: `${req.protocol}://${req.get('host')}/area-result/${searchId}` });
};

const getAreaResult = (req, res) => {
	const { id } = req.params;
	const result = areaSearchResults[id];

	if (!result) {
	  return res.status(404).send('Result not found');
	}
  
	if (result.status === 202) {
	  res.status(202).send('Result is still processing');
	} else {
	  res.json({ cities: result.cities });
	}
};

const getAllCities = (req, res) => {
	streamAllCities('addresses.json', res);
}

module.exports = {
  getCitiesByTag,
  getDistance,
  getArea,
  getAreaResult,
  getAllCities
};
