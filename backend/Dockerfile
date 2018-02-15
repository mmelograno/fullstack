FROM node:carbon

RUN npm install --global nodemon

RUN mkdir -p /backend
WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH
ADD package.json ./

RUN npm install

ADD  . .