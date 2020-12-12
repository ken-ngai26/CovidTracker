# Pull latest official node image
FROM node:latest

# Expose ports
EXPOSE 3000

# Set working directory
WORKDIR /app

# Add /app/node_modules/.bin to environment variables
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files and install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm i @material-ui/core
RUN npm i react-leaflet
RUN npm i react-bootstrap

COPY . .
# RUN npm install react-scripts -g

# Add React app to working directory
# ADD . /app

# Start the React app
CMD ["npm", "start"]