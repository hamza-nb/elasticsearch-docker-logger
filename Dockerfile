FROM node:lts-alpine

WORKDIR /usr/src/app/es-logger

COPY package.json .

RUN npm install

COPY . .


CMD ["node", "index.js"]