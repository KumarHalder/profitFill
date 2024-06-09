#!/bin/bash

# Function to check if PostgreSQL is ready
check_postgres() {
    echo "Checking if PostgreSQL is ready..."
    while ! pg_isready -h postgres -p 5432 -U profitFill > /dev/null 2>&1; do
        sleep 1
    done
    echo "PostgreSQL is ready"
}

# Call the function to check PostgreSQL availability
check_postgres

# Run migrations
echo "Running database migrations..."
dotnet ef database update

# Start the backend application
echo "Starting backend application..."
exec dotnet run --urls http://0.0.0.0:5236
