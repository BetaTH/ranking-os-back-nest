FROM node:16-alpine

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate           
RUN npm run build
RUN npx prisma migrate deploy
USER node
