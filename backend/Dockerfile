FROM node:8
WORKDIR /app

ENV JWT_KEY=this_is_a_secret_key
ENV MONGO_PW=<password>
ENV MONGO_URL=<ip_address>:27017

COPY package.json /app
RUN npm install

COPY . /app

CMD node server.js --env=prd

EXPOSE 3000
