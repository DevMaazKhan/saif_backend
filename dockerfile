FROM node:18.15.0-alpine

WORKDIR /backend

COPY package*.json /backend/

COPY prisma /backend/prisma

RUN npm install

COPY . /backend/

EXPOSE 4000

CMD ["npm", "run", "migrate"]

CMD ["npm", "run", "dev"]