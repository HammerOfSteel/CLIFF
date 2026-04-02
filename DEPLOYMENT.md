# CLIFF Deployment Guide

## Automated Deployment via GitHub Actions

The CLIFF application is automatically deployed to **cliff.dancingsalamanders.com** using GitHub Actions.

### Prerequisites (One-time Setup)

#### 1. GitHub Secrets (✅ Already Configured)
The following secrets are set in the GitHub repository:
- `ORACLE_SSH_KEY` - SSH private key for server access
- `ORACLE_HOST` - Server IP (129.151.193.219)
- `ORACLE_USER` - SSH username (ubuntu)

#### 2. Server Configuration (One-time manual setup)

**A. Install Nginx and Certbot (if not already installed)**
```bash
ssh -i ~/.ssh/id_rsa_oracle ubuntu@129.151.193.219
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

**B. Create Nginx Configuration**
```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/cliff.dancingsalamanders.com

# Paste the content from cliff.nginx.conf file

# Enable the site
sudo ln -s /etc/nginx/sites-available/cliff.dancingsalamanders.com \
            /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

**C. Setup SSL Certificate with Certbot**
```bash
# Obtain SSL certificate
sudo certbot --nginx -d cliff.dancingsalamanders.com

# Certbot will automatically update the nginx config with SSL settings
```

**D. Verify DNS**
Ensure the DNS A record is set:
```
A    cliff    129.151.193.219
```

### Deploying CLIFF

#### Manual Deployment Trigger

1. Go to GitHub repository: https://github.com/HammerOfSteel/CLIFF
2. Click on **Actions** tab
3. Select **Deploy CLIFF to Production** workflow
4. Click **Run workflow** button
5. Click the green **Run workflow** button
6. Monitor the deployment progress

#### What the Workflow Does

1. **Checks out code** from the repository
2. **Sets up SSH** connection to Oracle server
3. **Deploys backend** - Syncs all backend files to `/home/ubuntu/cliff/backend/`
4. **Deploys frontend** - Syncs all frontend files to `/home/ubuntu/cliff/design/`
5. **Creates production docker-compose.yml** with proper configuration
6. **Builds and restarts** Docker containers:
   - `cliff-postgres` on port 5434
   - `cliff-backend` on port 4000
   - `cliff-frontend` on port 3001
7. **Performs health checks** to ensure services are running

### Production Stack Details

**Services:**
- **PostgreSQL**: Internal port 5432, exposed as 5434
- **Backend (Express)**: Port 4000
- **Frontend (Next.js)**: Port 3001

**Nginx Routes:**
- `https://cliff.dancingsalamanders.com/` → Frontend (port 3001)
- `https://cliff.dancingsalamanders.com/api` → Backend (port 4000)

**Data Persistence:**
- PostgreSQL data stored in Docker volume: `cliff_postgres_data`
- Survives container restarts and rebuilds

### Existing Services (DO NOT TOUCH)

The Oracle server runs multiple services. CLIFF deployment will NOT affect:
- `lits_camping_frontend` (port 3000)
- `bifrost` (port 8081)
- `fauke` (port 8080)
- `renpy-web` (port 1338)
- `portainer` (port 9443)
- Other databases and services

### Troubleshooting

**Check container status:**
```bash
ssh -i ~/.ssh/id_rsa_oracle ubuntu@129.151.193.219
sudo docker ps --filter 'name=cliff-'
```

**View logs:**
```bash
# All logs
sudo docker compose -f /home/ubuntu/cliff/docker-compose.yml logs

# Specific service
sudo docker logs cliff-backend
sudo docker logs cliff-frontend
sudo docker logs cliff-postgres
```

**Restart specific service:**
```bash
cd /home/ubuntu/cliff
sudo docker compose restart backend
sudo docker compose restart frontend
```

**Full restart:**
```bash
cd /home/ubuntu/cliff
sudo docker compose down
sudo docker compose up -d
```

**Check nginx:**
```bash
sudo nginx -t
sudo systemctl status nginx
sudo systemctl reload nginx
```

**Renew SSL certificate (auto-renews, but manual if needed):**
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Database Access

**Connect to PostgreSQL:**
```bash
# From server
sudo docker exec -it cliff-postgres psql -U cliff_user -d cliff_db

# From local machine (requires SSH tunnel)
ssh -i ~/.ssh/id_rsa_oracle -L 5434:localhost:5434 ubuntu@129.151.193.219
psql -h localhost -p 5434 -U cliff_user -d cliff_db
```

**Backup database:**
```bash
sudo docker exec cliff-postgres pg_dump -U cliff_user cliff_db > cliff_backup_$(date +%Y%m%d).sql
```

### Environment Variables

Production environment variables are set in the `docker-compose.yml`:

**Backend:**
- `NODE_ENV=production`
- `DATABASE_URL=postgresql://cliff_user:cliff_password@postgres:5432/cliff_db`
- `JWT_SECRET=cliff-production-secret-2026-change-me` ⚠️ CHANGE THIS!
- `JWT_EXPIRES_IN=7d`
- `PORT=4000`

**Frontend:**
- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL=https://cliff.dancingsalamanders.com/api`

### Security Notes

⚠️ **Important:**
1. Change the JWT_SECRET in production docker-compose.yml
2. Never commit sensitive keys to the repository
3. SSL certificates auto-renew via certbot
4. All secrets are stored in GitHub Secrets (encrypted)

### Support

If you encounter issues:
1. Check GitHub Actions logs for deployment errors
2. SSH into server and check Docker logs
3. Verify nginx configuration
4. Ensure all ports are not blocked by firewall
