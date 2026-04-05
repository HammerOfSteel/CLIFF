#!/bin/bash
# Quick import script - run from CLIFF root directory

# Navigate to backend
cd "$(dirname "$0")/../backend" || exit 1

# Parse DATABASE_URL and run import with proper credentials
export DB_USER=$(echo $DATABASE_URL | sed -r 's/.*:\/\/([^:]+):.*/\1/')
export DB_PASSWORD=$(echo $DATABASE_URL | sed -r 's/.*:\/\/[^:]+:([^@]+)@.*/\1/')
export DB_HOST=$(echo $DATABASE_URL | sed -r 's/.*@([^:]+):.*/\1/')
export DB_PORT=$(echo $DATABASE_URL | sed -r 's/.*:([0-9]+)\/.*/\1/')
export DB_NAME=$(echo $DATABASE_URL | sed -r 's/.*\/([^?]+).*/\1/')

# For Docker, we need to run inside the container
echo "Copying stories to Docker container..."
docker cp ../stories/new_collection cliff-backend:/app/stories/

echo "Running import inside Docker container..."
docker exec cliff-backend node src/db/import-new-collection.js

echo "Done!"
