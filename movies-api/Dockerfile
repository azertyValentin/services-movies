FROM node:12.20.1

# Create app directory
WORKDIR /movie/src/app

COPY . .

RUN npm install
RUN npm build

CMD ["node", "dist/index.js"]

EXPOSE 5000