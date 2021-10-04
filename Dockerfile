# base image
FROM node:12-alpine

WORKDIR /app

# dependencies
COPY package*.json ./
RUN yarn install
COPY . .

# run 'yarn run start' when the container starts
CMD ["yarn", "run", "start"]