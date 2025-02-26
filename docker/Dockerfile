# Stage de build
FROM node:18-bullseye AS build
WORKDIR /app
# Configuración opcional de npm para cache y log
RUN npm config set cache /tmp/.npm && npm config set loglevel verbose && npm config set prefer-offline true
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage de producción
FROM nginx:alpine
# Se asume que la salida del build se genera en /app/dist
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
