FROM --platform=arm64 node:20-alpine

ARG BASE_PATH_CONTAINER

WORKDIR ${BASE_PATH_CONTAINER}

COPY . .

RUN npm install

