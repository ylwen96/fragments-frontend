FROM node:16.15.0

LABEL maintainer="Yuelin Wen <weny36@mcmaster.ca>"
LABEL description="Fragments frontend app"

ENV NPM_CONFIG_LOGLEVEL=warn

ENV NPM_CONFIG_COLOR=false

WORKDIR /app

COPY package*.json ./

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 3000
