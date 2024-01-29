const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const citiesRoutes = require('./routes/cityRoutes');

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

app.use(citiesRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
