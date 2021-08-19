FROM node:14 as node
WORKDIR /app
COPY package.json ./app
RUN npm install --silent
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node app/dist/user-management-app /usr/share/nginx/html
COPY ./config/nginx.conf /etc/ngix/conf.d/default.conf

# docker build -t user-management-app
# docker run -p 8081:80 user-management-app
