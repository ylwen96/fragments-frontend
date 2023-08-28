# Use an official Node.js runtime as the base image
FROM node:16.15.0

LABEL maintainer="Yuelin Wen <weny36@mcmaster.ca>"
LABEL description="Fragments node.js microservice"

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "start"]
