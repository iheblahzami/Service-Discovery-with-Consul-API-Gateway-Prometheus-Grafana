
https://roadmap.sh/projects/service-discovery

# 🚀 Service Discovery with Consul, API Gateway, Prometheus & Grafana

A hands-on microservices project demonstrating **Service Discovery**, **API Gateway Routing**, **Monitoring**, and **Observability** using Consul, Docker, Prometheus, and Grafana.

---

## 📖 Overview

In a microservices architecture, services need a reliable way to find and communicate with each other without hardcoding IP addresses or hostnames.

This project demonstrates how to:

- Register services dynamically with Consul
- Discover services through Consul's API
- Route requests through a centralized API Gateway
- Monitor services using Prometheus
- Visualize metrics with Grafana
- Deploy everything with Docker Compose

---

## 🏗️ Architecture

```text
                              ┌─────────────────┐
                              │   API Gateway   │
                              │    Port 8080    │
                              └────────┬────────┘
                                       │
                          Service Discovery Requests
                                       │
                                       ▼
                              ┌─────────────────┐
                              │     Consul      │
                              │    Port 8500    │
                              └─────────────────┘
                                 ▲      ▲      ▲
                                 │      │      │
                   ┌─────────────┘      │      └─────────────┐
                   │                    │                    │
                   ▼                    ▼                    ▼

            ┌────────────┐     ┌────────────┐     ┌────────────┐
            │ Service A  │     │ Service B  │     │ Service C  │
            │ Port 3001  │     │ Port 3002  │     │ Port 3003  │
            └────────────┘     └────────────┘     └────────────┘

                   ▲                    ▲                    ▲
                   └────────────┬───────┴───────────┬────────┘
                                │                   │
                                ▼                   ▼

                        ┌──────────────┐   ┌──────────────┐
                        │ Prometheus   │──▶│   Grafana    │
                        │ Port 9090    │   │ Port 3000    │
                        └──────────────┘   └──────────────┘
```

---

## ✨ Features

### Service Discovery
- Dynamic service registration with Consul
- Automatic service lookup
- Decoupled service communication

### API Gateway
- Single entry point for all services
- Service routing using Consul discovery
- Simplified client access

### Monitoring & Observability
- Prometheus metrics collection
- Service-level metrics
- Gateway metrics
- Consul metrics

### Visualization
- Grafana dashboards
- Real-time monitoring
- Resource utilization tracking

### Containerized Deployment
- Dockerized services
- Docker Compose orchestration
- Simple local setup

---

## 🛠️ Technology Stack

| Component | Technology |
|------------|------------|
| Service Discovery | Consul |
| API Gateway | Node.js + Express |
| Services | Node.js + Express |
| Monitoring | Prometheus |
| Visualization | Grafana |
| Containerization | Docker |
| Orchestration | Docker Compose |

---

## 📂 Project Structure

```text
service-discovery-consul/
│
├── docker-compose.yml
│
├── service-a/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── service-b/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── service-c/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── gateway/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── prometheus/
│   └── prometheus.yml
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Docker
- Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```

---

## 🔧 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/service-discovery-consul.git

cd service-discovery-consul
```

Build and start all containers:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

---

## 🌐 Available Services

| Service | URL |
|----------|------|
| API Gateway | http://localhost:8080 |
| Consul UI | http://localhost:8500 |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3000 |

---

## 🔍 Service Discovery Workflow

### 1. Service Startup

Each service starts and registers itself with Consul:

```text
Service A
   │
   ├── Register Service
   ▼
 Consul
```

### 2. Client Request

```http
GET /service-a/info
```

Request hits the API Gateway.

### 3. Service Lookup

Gateway queries Consul:

```http
GET /v1/catalog/service/service-a
```

### 4. Routing

Gateway retrieves:

```json
{
  "address": "service-a",
  "port": 3001
}
```

### 5. Response

Gateway forwards the request and returns:

```json
{
  "service": "service-a",
  "timestamp": "2026-06-19T12:00:00Z"
}
```

---

## 📡 API Endpoints

### Service Information

#### Service A

```http
GET /service-a/info
```

#### Service B

```http
GET /service-b/info
```

#### Service C

```http
GET /service-c/info
```

Example response:

```json
{
  "service": "service-a",
  "timestamp": "2026-06-19T12:00:00Z"
}
```

---

## 📈 Monitoring

### Metrics Endpoint

Every service exposes:

```http
GET /metrics
```

Collected by Prometheus automatically.

---

### Example Metrics

```prometheus
http_requests_total
```

```prometheus
process_cpu_user_seconds_total
```

```prometheus
process_resident_memory_bytes
```

```prometheus
up
```

---

## 📊 Grafana Dashboard

Suggested panels:

### Request Count

```promql
http_requests_total
```

### Service Health

```promql
up
```

### Memory Usage

```promql
process_resident_memory_bytes
```

### CPU Usage

```promql
rate(process_cpu_user_seconds_total[1m])
```

---

## 🧪 Testing

### Service A

```bash
curl http://localhost:8080/service-a/info
```

### Service B

```bash
curl http://localhost:8080/service-b/info
```

### Service C

```bash
curl http://localhost:8080/service-c/info
```

---

### Generate Load

```bash
for i in {1..100}
do
  curl http://localhost:8080/service-a/info
done
```

Observe the metrics update in Grafana.

---

## 📚 Learning Outcomes

Through this project you will learn:

- Service Discovery fundamentals
- Consul registration and lookup mechanisms
- API Gateway design patterns
- Service-to-Service communication
- Monitoring with Prometheus
- Dashboard creation with Grafana
- Docker-based microservice deployments
- Basic observability practices

---

## 🔮 Future Improvements

### Service Health Checks

Add Consul health checks:

```json
{
  "Check": {
    "HTTP": "http://service-a:3001/info",
    "Interval": "10s"
  }
}
```

### Load Balancing

Run multiple service instances:

```bash
docker compose up --scale service-a=3
```

### Distributed Tracing

Add:

- Jaeger
- OpenTelemetry

### Security

- TLS communication
- Consul ACLs
- API authentication

### Kubernetes Migration

Deploy the same architecture using:

- Kubernetes
- Helm
- Consul on Kubernetes

---

## 🎯 Key Concepts Demonstrated

✅ Microservices Architecture

✅ Service Discovery

✅ API Gateway Pattern

✅ Dynamic Service Registration

✅ Observability

✅ Metrics Collection

✅ Monitoring Dashboards

✅ Containerization

✅ Docker Networking

---

## 📸 Screenshots

### Consul Services

Add screenshot here:

```text
screenshots/consul-services.png
```

### Prometheus Targets

Add screenshot here:

```text
screenshots/prometheus-targets.png
```

### Grafana Dashboard

Add screenshot here:

```text
screenshots/grafana-dashboard.png
```

---



