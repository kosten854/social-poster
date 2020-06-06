FROM node:13

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build  


RUN mkdir -p /app

WORKDIR /app

COPY . /app


CMD [ "node","/dist/src/main.js" ]

