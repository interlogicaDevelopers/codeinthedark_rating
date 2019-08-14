FROM node:11

WORKDIR /usr/local/citd-rating

COPY package*.json ./
RUN npm i
COPY certs ./certs
COPY server.js .
COPY v1 ./v1
COPY vrmode ./vrmode
EXPOSE 8000
EXPOSE 8001

CMD node server.js
