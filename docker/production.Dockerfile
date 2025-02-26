# Stage de build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

# Stage de producción
FROM nginx:alpine
# Se asume que la salida del build se genera en /app/dist
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
