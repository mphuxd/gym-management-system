FROM node:16-alpine
WORKDIR ./

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

USER node

EXPOSE 3000

CMD ["yarn", "start"]