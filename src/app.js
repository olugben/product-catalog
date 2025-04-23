// src/app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const productRoutes = require('./routes/products.route');
// const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());


// API Documentation
const swaggerSpec = YAML.load("./swagger.yaml");
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// console.log(JSON.stringify(swaggerSpec, null, 2)); // Pretty print the Swagger spec

// Routes
app.use('/api/products', productRoutes);



// app.use(errorHandler);

module.exports = app;