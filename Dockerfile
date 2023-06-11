FROM node:16.17.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm start