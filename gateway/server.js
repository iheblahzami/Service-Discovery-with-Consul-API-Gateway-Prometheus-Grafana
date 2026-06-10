const express = require('express');
const axios = require('axios');

const app = express();

const client = require("prom-client");

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

app.get("/metrics", async (req, res) => {

  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

async function discoverService(serviceName) {

  const response = await axios.get(
    `http://consul:8500/v1/catalog/service/${serviceName}`
  );

  const service = response.data[0];

  return {
    address: service.ServiceAddress,
    port: service.ServicePort
  };
}

app.get('/:service/info', async (req, res) => {

  try {

    const serviceName = req.params.service;

    const service = await discoverService(serviceName);

    const response = await axios.get(
      `http://${service.address}:${service.port}/info`
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.listen(8080, () => {
  console.log('Gateway running');
});
