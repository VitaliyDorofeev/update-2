FROM node:20-alpine3.19 AS builder
WORKDIR /app
RUN apk add --no-cache --virtual .build-deps make gcc g++ python3
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.25.5-alpine
EXPOSE 80
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/pooling-pallet-return /usr/share/nginx/html