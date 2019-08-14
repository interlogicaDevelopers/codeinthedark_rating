FROM node:11

WORKDIR /usr/local/citd-rating

COPY package*.json ./
RUN npm i

# COPY certs ./certs

EXPOSE 8000
EXPOSE 8001

CMD npm start
