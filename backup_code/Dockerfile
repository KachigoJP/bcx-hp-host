FROM node:18.20.4 as builder

WORKDIR /app
# Copies only package.json and yarn.lock before running yarn install. This enables better caching, as the yarn install step will only be re-run if these files have changed.
# COPY package.json ./
COPY . .
# Uses the --frozen-lockfile option to ensure that yarn.lock is not updated during the install process
# Adds the --production flag to only install production dependencies, skipping development dependencies
RUN npm install --legacy-peer-deps

RUN npm run build

FROM nginx:1.21-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/public /usr/share/nginx/html
ENV PORT 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

