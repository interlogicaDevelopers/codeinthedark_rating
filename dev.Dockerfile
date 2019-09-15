FROM node:11

WORKDIR /usr/local/citd-rating

COPY run.sh ./
RUN ["chmod", "+x", "run.sh"]
COPY rollup.* ./
COPY package*.json ./
RUN npm i

EXPOSE 8000
EXPOSE 8001

CMD ./run.sh
