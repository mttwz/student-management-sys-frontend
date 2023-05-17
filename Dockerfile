FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Start a new stage
FROM node:14-alpine

WORKDIR /app

COPY --from=build-stage /app/dist/student-mgmnt-frontend/ .

# Install the http-server globally
RUN npm install -g http-server

# Expose the port on which the Angular app will run
EXPOSE 4200

CMD ["http-server", "-p", "4200", "."]
