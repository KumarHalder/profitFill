# Use a base Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . ./

# Build the React app
RUN npm run build

# Expose the port your React app runs on
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
