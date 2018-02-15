
FROM node:carbon

RUN mkdir -p /frontend
WORKDIR /frontend

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

ENV PATH /frontend/node_modules/.bin:$PATH

ADD package.json ./
RUN npm install

ADD . .