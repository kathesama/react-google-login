# TODO: slim down to alpine and multi-stage with distroless
FROM node:14 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL http://<api-url>:<por>/v1
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY src ./src
COPY static ./static
COPY public ./public
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]