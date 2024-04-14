FROM node:20
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD node server.js
EXPOSE 3000