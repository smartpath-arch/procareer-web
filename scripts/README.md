# Deployment Scripts

Scripts untuk deployment aplikasi FeSkillSpace menggunakan Docker.

## Setup di Server

1. **Install Dependencies**

   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh

   # Install Docker Compose
   sudo apt-get update
   sudo apt-get install docker-compose-plugin
   ```

2. **Copy Scripts ke Server**

   ```bash
   # Di server, buat direktori scripts
   mkdir -p ~/scripts

   # Copy scripts dari repository
   cp scripts/deploy-dev.sh ~/scripts/
   cp scripts/deploy-prod.sh ~/scripts/

   # Beri permission execute
   chmod +x ~/scripts/deploy-dev.sh
   chmod +x ~/scripts/deploy-prod.sh
   ```

3. **Setup Direktori Aplikasi**

   ```bash
   # Development
   mkdir -p ~/feskillspace-dev

   # Production
   mkdir -p ~/feskillspace-prod
   ```

4. **Setup Environment Variables**

   ```bash
   # Development
   cp .env.example ~/feskillspace-dev/.env.production

   # Production
   cp .env.example ~/feskillspace-prod/.env.production
   ```

## Manual Deployment

### Development

```bash
bash ~/scripts/deploy-dev.sh
```

### Production

```bash
bash ~/scripts/deploy-prod.sh
```

## Automated Deployment

GitHub Actions akan otomatis menjalankan deployment saat:

- Push ke branch `dev` → Deploy Development
- Push ke branch `main` → Deploy Production

## Troubleshooting

### Cek logs container

```bash
# Development
cd ~/feskillspace-dev
docker compose -f docker-compose.dev.yml logs -f

# Production
cd ~/feskillspace-prod
docker compose logs -f
```

### Restart container

```bash
# Development
cd ~/feskillspace-dev
docker compose -f docker-compose.dev.yml restart

# Production
cd ~/feskillspace-prod
docker compose restart
```

### Stop container

```bash
# Development
cd ~/feskillspace-dev
docker compose -f docker-compose.dev.yml down

# Production
cd ~/feskillspace-prod
docker compose down
```
