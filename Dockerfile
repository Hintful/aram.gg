# Pull latest official node image
FROM node:latest

# Expose ports
EXPOSE 3000
EXPOSE 35729

# Set working directory
WORKDIR /api

RUN apt-get update -y
RUN apt-get install -y python3-pip python-dev build-essential

# Add /app/node_modules/.bin to environment variables
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files and install app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# Add React app to working directory
ADD . /api

# Start the React app
CMD ["npm", "start"]
