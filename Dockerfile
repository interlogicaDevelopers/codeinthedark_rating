FROM node:11

WORKDIR /usr/local/citd-rating

COPY package*.json ./
RUN npm i
COPY src/server.js .
COPY src/v1 ./v1
COPY src/vrmode ./vrmode
EXPOSE 8000
EXPOSE 8001

CMD node server.js
