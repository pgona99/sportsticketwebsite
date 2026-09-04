# SportTicket

[![CI](https://img.shields.io/github/actions/workflow/status/pgona99/sportsticketwebsite/ci.yml?branch=main&label=CI)](https://github.com/pgona99/sportsticketwebsite/actions/workflows/ci.yml)
[![Azure App Service](https://img.shields.io/badge/Azure-App%20Service-0078D4?logo=microsoftazure&logoColor=white)](https://learn.microsoft.com/azure/app-service/)

SportTicket is a demo ticket-booking web app built with Next.js. It includes an event listing page, login flow, and cart experience for a sports ticket marketplace.

## Features

- Event browsing experience
- Demo login flow
- Add-to-cart functionality
- Docker support
- Kubernetes manifest for container orchestration
- GitHub Actions CI and Azure deployment workflow

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Docker

```bash
docker build -t sportsticket:latest .
docker run -p 3000:3000 sportsticket:latest
```

## GitHub Actions

This project includes:

- CI workflow that runs install, lint, and production build on pushes and pull requests
- Azure deployment workflow that deploys to Azure App Service when changes land on main

## Azure deployment

To complete the Azure connection, add the following GitHub repository secrets:

- `AZURE_CREDENTIALS`
- `AZURE_WEBAPP_NAME`

Example Azure CLI commands to create the app service:

```bash
az login
az group create --name sportsticket-rg --location eastus
az appservice plan create --name sportsticket-plan --resource-group sportsticket-rg --sku B1 --is-linux
az webapp create --resource-group sportsticket-rg --plan sportsticket-plan --name <your-app-name> --runtime "NODE|20-lts"
```

Then configure the GitHub secrets in the repository settings and push to the `main` branch.

## Project status

This app is ready for local development, Dockerized deployment, and Azure App Service deployment automation.

## Notes

The current cart implementation stores items in memory. For multi-instance or scaled production deployment, use a shared session or database layer such as Redis or PostgreSQL.
