# Use a base .NET Core SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory
WORKDIR /app

# Update package lists and install PostgreSQL client
RUN apt-get update && \
    apt-get install -y postgresql-client
    
# Install the Entity Framework Core tools
RUN dotnet tool install --global dotnet-ef

# Add the directory containing the global tools to the PATH
ENV PATH="${PATH}:/root/.dotnet/tools"

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./

# Ensure the entrypoint.sh script is copied and has the correct permissions
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Build the application
RUN dotnet build -c Release -o /app/build

# Expose port 5236
EXPOSE 5236

# Command to run the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]