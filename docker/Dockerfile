FROM node:18-bullseye AS build

RUN npm config set cache /tmp/.npm && npm config set loglevel verbose && npm config set prefer-offline true

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]