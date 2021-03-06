FROM node:alpine AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /usr/app/dist .
COPY --from=builder /usr/app/prisma/@client ./prisma/@client
COPY .env .
EXPOSE 4000
CMD node src/index.js -r dotenv/config