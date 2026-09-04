# Kubernetes deployment for SportTicket

This directory contains a minimal Kubernetes setup for the app.

## Prerequisites

- Kubernetes cluster available
- `kubectl` installed and configured
- Docker image built locally or pushed to a registry

## Build and push the image

```bash
cd /Users/prashanthkumargona/Desktop/Projects\ AI/sportsticketwebsite
docker build -t sportsticket:latest .
```

For a cluster, use a registry tag instead of `:latest`, for example:

```bash
# Example only
docker tag sportsticket:latest your-registry.example.com/sportsticket:latest
docker push your-registry.example.com/sportsticket:latest
```

Then update the image in `deployment.yaml`.

## Apply the manifest

```bash
kubectl apply -f k8s/deployment.yaml
```

## Check deployment status

```bash
kubectl get pods
kubectl get svc
kubectl get deployment
```

## Access the app

If using a LoadBalancer service:

```bash
kubectl get service sportsticket-service
```

Then use the external IP or port output in the browser.

## Important note

This app stores cart data in memory. When running multiple replicas in Kubernetes, cart state will not be shared across pods unless you add a shared cache or database layer such as Redis or PostgreSQL.
