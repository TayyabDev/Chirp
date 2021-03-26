
FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --silent

COPY . .

EXPOSE 9080

CMD [ "node", "app.js" ]