FROM node:20.16.0-alpine3.20 AS build
WORKDIR /the-deer-bot-build
COPY . .
RUN yarn install && yarn build

FROM node:20.16.0-alpine3.20 AS deploy
WORKDIR /the-deer-bot
COPY --from=build /the-deer-bot-build/build /the-deer-bot/build
COPY --from=build /the-deer-bot-build/node_modules /the-deer-bot/node_modules
ENTRYPOINT [ "node", "build/index.js" ]