FROM node:alpine
WORKDIR /app

# Setup global install layers
RUN npm install typescript -g

# Add application specific NPM installation layer
COPY ./package* ./
RUN npm install

# Build the actual application
COPY . /app
RUN tsc