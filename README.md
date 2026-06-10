# Service-Discovery-with-Consul-API-Gateway-Prometheus-Grafana
A hands-on DevOps project demonstrating service discovery in a microservices architecture using Consul, along with monitoring and observability using Prometheus and Grafana.
https://roadmap.sh/projects/service-discovery
Overview

This project simulates a microservices environment where multiple services register themselves with Consul and are discovered dynamically by an API Gateway. The monitoring stack collects and visualizes metrics from all components.

Features
Service discovery using Consul
Automatic service registration
API Gateway for request routing
Three dummy microservices
Prometheus metrics collection
Grafana dashboards
Docker Compose orchestration
Health monitoring and observability
Architecture

                           +----------------+
                           |   API Gateway  |
                           |    Port 8080   |
                           +--------+-------+
                                    |
                                    |
                           Service Discovery
                                    |
                                    v
                           +----------------+
                           |     Consul     |
                           |    Port 8500   |
                           +----------------+
                            /      |      \
                           /       |       \
                          v        v        v

                   +---------+ +---------+ +---------+
                   |Service A| |Service B| |Service C|
                   |  3001   | |  3002   | |  3003   |
                   +---------+ +---------+ +---------+

                              Monitoring
                                    |
                 +------------------+------------------+
                 |                                     |
                 v                                     v
          +---------------+                    +---------------+
          |  Prometheus   |                    |    Grafana    |
          |    9090       |                    |     3000      |
          +---------------+                    +---------------+

Technologies Used
Node.js
Express.js
Docker
Docker Compose
Consul
Prometheus
Grafana
How It Works
Service Registration

Each microservice automatically registers itself with Consul when it starts.

Example registration:

{
  "Name": "service-a",
  "ID": "service-a",
  "Address": "service-a",
  "Port": 3001
}
Service Discovery

The API Gateway queries Consul's Catalog API to locate available services dynamically.

GET /v1/catalog/service/service-a

Instead of using hardcoded IP addresses, the gateway discovers service locations at runtime.

Request Flow

Client Request
      |
      v
API Gateway
      |
      v
Consul Lookup
      |
      v
Target Service
      |
      v
Response Returned

Getting Started
Prerequisites

Install:

Docker
Docker Compose

Verify installation:

docker --version
docker compose version
Clone Repository
git clone https://github.com/your-username/service-discovery-consul.git

cd service-discovery-consul
Build and Run
docker compose up --build

All services will start automatically.

Accessing Components
Component	URL
API Gateway	http://localhost:8080
Consul UI	http://localhost:8500
Prometheus	http://localhost:9090
Grafana	http://localhost:3000
Testing Services
Direct Service Access

Service A

curl http://localhost:3001/info

Service B

curl http://localhost:3002/info

Service C

curl http://localhost:3003/info

Example Response:

{
  "service": "service-a",
  "timestamp": "2026-06-10T12:30:45.000Z"
}
Through API Gateway

Service A

curl http://localhost:8080/service-a/info

Service B

curl http://localhost:8080/service-b/info

Service C

curl http://localhost:8080/service-c/info
Consul Verification

List all registered services:

curl http://localhost:8500/v1/catalog/services

Expected Output:

{
  "service-a": [],
  "service-b": [],
  "service-c": []
}

Retrieve details for a specific service:

curl http://localhost:8500/v1/catalog/service/service-a
Monitoring
Prometheus

Prometheus scrapes metrics from:

Service A
Service B
Service C
API Gateway
Consul

Useful queries:

up
http_requests_total
process_cpu_user_seconds_total
process_resident_memory_bytes
Grafana

Default Login:

Username: admin
Password: admin

Add Prometheus datasource:

http://prometheus:9090

Suggested Dashboard Panels:

Panel	Query
Request Count	http_requests_total
Service Health	up
Memory Usage	process_resident_memory_bytes
CPU Usage	rate(process_cpu_user_seconds_total[1m])
Generate Test Traffic

Linux/macOS

for i in {1..100}
do
curl http://localhost:8080/service-a/info
done

PowerShell

1..100 | ForEach-Object {
    Invoke-WebRequest http://localhost:8080/service-a/info
}

Observe metrics changing in Grafana.



