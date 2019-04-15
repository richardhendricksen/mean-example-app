FROM node:8
WORKDIR /app

ENV JWT_KEY=this_is_a_secret_key
ENV MONGO_PW=mean
ENV MONGO_URL=34.244.160.184:27017

COPY package.json /app
RUN npm install

COPY . /app

CMD node server.js

EXPOSE 3000
