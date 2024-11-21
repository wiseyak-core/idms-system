FROM node:20.15.0

WORKDIR /idms-system

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3001

CMD ["yarn","preview"]
