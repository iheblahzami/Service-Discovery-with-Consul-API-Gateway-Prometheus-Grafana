const express = require("express");
const client = require("prom-client");

const app = express();

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP Requests"
});

register.registerMetric(httpRequests);

app.get("/info", (req, res) => {

  httpRequests.inc();

  res.json({
    service: "service-c",
    timestamp: new Date()
  });
});

app.get("/metrics", async (req, res) => {

  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

app.listen(3003);
