FROM node:18-alpine as base

WORKDIR /app
COPY package*.json .

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . .
CMD ["npm", "run", "dev"]
