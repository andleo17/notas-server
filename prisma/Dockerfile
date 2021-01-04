FROM node:alpine
WORKDIR /usr/app
RUN npm install @prisma/cli
COPY . ./prisma
CMD npx prisma migrate deploy --preview-feature