FROM node:24.14-bookworm
WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "build"]