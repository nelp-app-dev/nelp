FROM node:current-alpine AS base
WORKDIR /nelp
COPY ./packages/ ./packages/
COPY ./package.json ./yarn.lock ./lerna.json ./tsconfig.json ./
RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn lerna run --scope @nelp/common build && yarn lerna bootstrap
CMD yarn lerna run start --stream

# FROM base as test
# WORKDIR /nelp
# COPY --from=base . .
# ENV NODE_ENV=development
# CMD yarn lerna run test --stream

# FROM base as development
# WORKDIR /nelp
# COPY --from=base . .
# ENV NODE_ENV=development
# CMD yarn lerna run start --stream

# FROM base as apiion
# WORKDIR /api
# ENV NODE_ENV=apiion
# COPY apps/ ./apps/
# COPY libs/ ./libs/
# RUN yarn build api \
#   & yarn build auth 
# CMD node ./dist/apps/api/main \
#   & node ./dist/apps/auth/main 
# HEALTHCHECK CMD curl --fail http://nelp.com:3700/docs
