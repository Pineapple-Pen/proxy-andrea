FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package*.json ./
RUN npm install --production
COPY . /src/app
EXPOSE 3000
CMD [ "node", "server/index.js" ]
